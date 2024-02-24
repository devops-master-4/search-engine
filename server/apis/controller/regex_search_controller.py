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
    # {"value":"ddd","options":["languages","authors","title","subjects"]}

    # search_result = books_collection.find(
    #     {
    #         "$or": [
    #             {"title": {"$regex": params["title"], "$options": "i"}},
    #             {"authors": {"$regex": params["authors"], "$options": "i"}},
    #             {"subjects": {"$regex": params["subjects"], "$options": "i"}},
    #             {"languages": {"$regex": params["languages"], "$options": "i"}},
    #         ]
    #     },
    #     params,
    # )

    options = params["options"]
    value = params["value"]
    print(options, value)

    for option in options:
        search_result = books_collection.find(
            {
                option: {"$regex": value, "$options": "i"}
            },
            params,
        )
        if search_result.count() > 0:
            break

    return list(search_result)


if __name__ == "__main__":
    search_params = {
        "title": "Bonjour",
        "authors": "",
        "subjects": "",
        "languages": ""
    }
    print(regex_search(search_params))
