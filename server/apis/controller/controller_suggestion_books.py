import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import MultiLabelBinarizer
from bson import ObjectId
import pymongo
import json


def connect_to_mongo():
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client["library"]
    books_collection = db["books"]
    tfidf_collection = db["tfidf_data"]
    return books_collection, tfidf_collection


params = {
    "_id": 1,
    "title": 1,
    "authors.name": 1,
    "bookshelves": 1,
    "formats": 1,
    "subjects":1
}

books_collection, _ = connect_to_mongo()

X = pd.DataFrame(list(books_collection.find({}, params)))

X['authors'] = X['authors'].apply(
    lambda authors: [author['name'] for author in authors])
features = X['authors'] + \
    X['bookshelves'].apply(lambda shelves: [shelf.lower()
                           for shelf in shelves])

mlb = MultiLabelBinarizer()
features_matrix = mlb.fit_transform(features)

num_clusters = 15
kmeans = KMeans(n_clusters=num_clusters, random_state=42)
X['suggestion_cluster'] = kmeans.fit_predict(features_matrix)


# def get_suggestions_for_books(book_ids_str, num_suggestions=3):
#     book_ids = [ObjectId(book_id) for book_id in book_ids_str.split(',')]

#     all_suggestions = []

#     for book_id in book_ids:
#         book_cluster = X.loc[X['_id'] == book_id, 'suggestion_cluster'].values

#         if len(book_cluster) == 0:
#             print(f"Book with _id '{book_id}' not found.")
#             continue

#         book_cluster = book_cluster[0]

#         cluster_books = X[X['suggestion_cluster'] == book_cluster]
#         cluster_books = cluster_books[cluster_books['_id'] != book_id]

#         suggestion_ids = cluster_books['_id'].head(num_suggestions).tolist()

#         # get the books
#         data = []
#         for suggestion_id in suggestion_ids:
#             suggestion = books_collection.find_one(
#                 {"_id": suggestion_id}, params)
#             suggestion["_id"] = str(suggestion["_id"])
#             data.append(suggestion)

#         all_suggestions.append({str(book_id): data})

#     return all_suggestions


# if __name__ == '__main__':
#     book_ids_str = '65d4cf6e92a664997f160345,65d4cf6c92a664997f160344'
#     book_suggestions = get_suggestions_for_books(book_ids_str)

#     for suggestion_dict in book_suggestions:
#         for book_id, suggestions in suggestion_dict.items():
#             print(f"Suggestions for the book with _id(s) '{book_id}':")
#             for suggestion in suggestions:
#                 print(json.dumps(suggestion, indent=2))


def get_suggestions_for_books(book_ids_str, num_suggestions=3):
    book_ids = [ObjectId(book_id) for book_id in book_ids_str.split(',')]

    all_suggestions = []

    for book_id in book_ids:
        book_cluster = X.loc[X['_id'] == book_id, 'suggestion_cluster'].values

        if len(book_cluster) == 0:
            print(f"Book with _id '{book_id}' not found.")
            continue

        book_cluster = book_cluster[0]

        cluster_books = X[X['suggestion_cluster'] == book_cluster]
        cluster_books = cluster_books[cluster_books['_id'] != book_id]

        suggestion_ids = cluster_books['_id'].head(num_suggestions).tolist()

        # get the books
        data = []
        for suggestion_id in suggestion_ids:
            suggestion = books_collection.find_one(
                {"_id": suggestion_id}, params)
            suggestion["_id"] = str(suggestion["_id"])
            if suggestion['_id'] not in [book['_id'] for book in data]:
                data.append(suggestion)

        all_suggestions.extend(data)
        all_suggestions = [i for n, i in enumerate(all_suggestions) if i not in all_suggestions[n + 1:]]

    return ["Basé sur vos lectures récentes...", all_suggestions]


if __name__ == '__main__':
    book_ids_str = '65d4cf6e92a664997f160345,65d4cf6c92a664997f160344'
    book_suggestions = get_suggestions_for_books(book_ids_str)

    print((book_suggestions, len(book_suggestions)))
