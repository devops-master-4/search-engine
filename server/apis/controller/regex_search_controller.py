# search with regex
import redis
from controller_suggestions import connect_to_mongo
import json

books_collection, _ = connect_to_mongo()


params = {
    "_id": 1,
    "title": 1,
    "authors": 1,
    "download_count": 1,
    "formats": 1
    "subjects":1
}

r = redis.StrictRedis(host='localhost', port=6379, db=0)


def regex_search(params):

    options = params["options"]
    value = params["value"]
    print(options, value)

    if r.exists(value):
        print("query found in cache")
        return json.loads(r.get(value))

    for option in options:
        search_result = books_collection.find(
            {
                option: {"$regex": value, "$options": "i"}
            },
            params,
        )
        if search_result.count() > 0:
            break

    data = ['Résultats de la recherche...', list(search_result)]

    r.set(value, json.dumps(data))
    return list(data)


if __name__ == "__main__":
    search_params = {
        "title": "Bonjour",
        "authors": "",
        "subjects": "",
        "languages": ""
    }
    print(regex_search(search_params))
