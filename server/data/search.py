import pymongo
from sklearn.feature_extraction.text import TfidfVectorizer

client = pymongo.MongoClient("mongodb://localhost:27017")

db = client["library"]

books_collection = db["books"]

tfidf_collection = db["tfidf_data"]

vectorizer = TfidfVectorizer()

for book in books_collection.find():
    existing_tfidf_data = tfidf_collection.find_one(
        {"document_id": book["_id"]})

    if existing_tfidf_data:
        print(f"TF-IDF data already exists for book with _id: {book['_id']}")
    else:
        text_content = book["formats"]["text/plain; charset=us-ascii"]["content"]
        tfidf_matrix = vectorizer.fit_transform([text_content])

        tfidf_matrix_list = tfidf_matrix.tolil().toarray().tolist()

        tfidf_data = {
            "document_id": book["_id"],
            "tfidf_matrix": tfidf_matrix_list,
            "vectorizer_vocabulary": vectorizer.vocabulary_,
        }

        tfidf_collection.insert_one(tfidf_data)
        print(
            f"TF-IDF data computed and stored for book with _id: {book['_id']}")

client.close()
