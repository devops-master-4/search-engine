import pymongo
import random
from bson import ObjectId
import pathlib


def connect_to_mongo():
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client["library"]
    books_collection = db["books"]
    tfidf_collection = db["tfidf_data"]
    return books_collection, tfidf_collection


params = {
    "_id": 1,
    "title": 1,
    "authors": 1,
    "download_count": 1,
}

books_collection, _ = connect_to_mongo()


def get_most_downloaded_books():
    res = list(books_collection.find({}, params).sort(
        "download_count", -1).limit(10))

    for item in res:  # convert _id to string
        item["_id"] = str(item["_id"])
        cover_path = pathlib.Path(
            __file__).parent.parent

        if cover_path.exists():
            cover_path = str(cover_path) + "/assets/covers/" + \
                item["_id"] + ".jpg"
            item['covers'] = cover_path
    return ["Les plus populaires...", res]


# get random books with params for the front end
def get_random_books():
    random_books = list(books_collection.aggregate([
        {"$sample": {"size": 10}},
        {"$project": params}
    ]))

    for item in random_books:  # convert _id to string
        item["_id"] = str(item["_id"])

    return ["Quelques sélections aléatoires...", random_books]


# bookshelves by women bookshelves
def get_books_by_genre():
    bookshelves = ['6 Best Loved Spanish Literary Classics',
                   'Adventure',
                   'Africa',
                   'African American Writers',
                   'American Revolutionary War',
                   'Anarchism',
                   'Animals-Domestic',
                   'Animals-Wild',
                   'Animals-Wild-Birds',
                   'Animals-Wild-Insects',
                   'Anthropology',
                   'Archaeology',
                   'Architecture',
                   'Art',
                   'Arthurian Legends',
                   'Astronomy',
                   'Atheism',
                   'Australia',
                   'Banned Books List from the American Library Association',
                   "Banned Books from Anne Haight's list",
                   'Best Books Ever Listings',
                   'Bestsellers, American, 1895-1923',
                   'Bibliomania',
                   'Biographies',
                   'Biology',
                   'Botany',
                   'British Law',
                   'Buddhism',
                   'CIA World Factbooks',
                   'Canada',
                   'Chemistry',
                   "Children's Anthologies",
                   "Children's Book Series",
                   "Children's Fiction",
                   "Children's History",
                   "Children's Instructional Books",
                   "Children's Literature",
                   "Children's Myths, Fairy Tales, etc.",
                   "Children's Picture Books",
                   "Children's Verse",
                   'Christianity',
                   'Christmas',
                   'Classical Antiquity',
                   'Contemporary Reviews',
                   'Cookbooks and Cooking',
                   'Crafts',
                   'Crime Fiction',
                   'Crime Nonfiction',
                   'DE Drama',
                   'DE Kinderbuch',
                   'DE Lyrik',
                   'DE Prosa',
                   'DE Sachbuch',
                   'Detective Fiction',
                   'Early English Text Society',
                   'Egypt',
                   'Erotic Fiction',
                   'FR Langues',
                   'FR Littérature',
                   'FR Nouvelles',
                   'FR Poésie',
                   'FR Science fiction',
                   'Fantasy',
                   'Folklore',
                   'France',
                   'Geology',
                   'Germany',
                   'Gothic Fiction',
                   'Greece',
                   'Harvard Classics',
                   'Hinduism',
                   'Historical Fiction',
                   'Horror',
                   'Horticulture',
                   'Humor',
                   'IT Poesia',
                   'India',
                   'Islam',
                   'Italy',
                   'Judaism',
                   'Language Education',
                   'Latter Day Saints',
                   'Manufacturing',
                   'Mathematics',
                   'Medicine',
                   'Microbiology',
                   'Movie Books',
                   'Music',
                   'Mystery Fiction',
                   'Mythology',
                   'Napoleonic(Bookshelf)',
                   'Native America',
                   'New Zealand',
                   'One Act Plays',
                   'Opera',
                   'PT Poesia',
                   'PT Romance',
                   'Paganism',
                   'Philosophy',
                   'Photography']
    # select a random genres
    genre = random.choice(bookshelves)

    genre_books = list(books_collection.find(
        {"bookshelves": genre}, params).limit(10))

    for item in genre_books:
        item["_id"] = str(item["_id"])

    return ["Ce genre pourrait vous intéresser :  " + genre, genre_books]


def get_continue_reading(books_id):
    print("books_id", books_id)
    res = []
    for i in range(len(books_id)):
        # Use find_one to get a single document by ID
        id = ObjectId(books_id[i])
        b = books_collection.find_one({"_id": id}, params)
        res.append(b)

    books = list(res)

    for item in books:
        if item:
            item["_id"] = str(item["_id"])

    return ["Reprenez là où vous êtes arrêté...", books]


if __name__ == "__main__":
    print(get_books_by_genre())
    print(get_random_books())
