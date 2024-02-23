# search with regex
import pymongo
import pathlib
from controller_suggestions import connect_to_mongo

books_collection, _ = connect_to_mongo()


params = {
    "_id": 1,
    "title": 1,
    "authors": 1,
    "download_count": 1,
}


def regex_search(params):
    query = {}

    for key, value in params.items():
        if value:
            query[key] = {"$regex": value, "$options": "i"}

    res = list(books_collection.find(query, params).limit(10))
    return ["Regex search", res]


if __name__ == "__main__":
    search_params = {
        "title": "Bonjour",
        "authors": "",
        "subjects": "",
        "languages": ""
    }
    print(regex_search(search_params))
