import pymongo
from whoosh.index import open_dir
from whoosh.qparser import QueryParser
from whoosh.scoring import TF_IDF
import pathlib
import json
import redis


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
    "formats": 1,
    "subjects":1
}

books_collection, _ = connect_to_mongo()

# connect to redis in docker

r = redis.StrictRedis(host='localhost', port=6379, db=0)


def search_ctrl(query_str, params):
    result = []
    print("searching for jhhhhhhhhh: ", query_str)
    # check if the query is already in the cache
    if r.exists(query_str):
        print("query found in cache")
        return json.loads(r.get(query_str))

    # Open the existing index
    whoosh_path = pathlib.Path(
        __file__).parent.parent.parent.parent / "whoosh_index"
    print(whoosh_path)
    current_path = str(pathlib.Path(__file__).parent)
    whoosh_path = str(whoosh_path)

    # return [current_path, whoosh_path]
    try:
        ix = open_dir(whoosh_path)
    except Exception as e:
        print("error: ", e)
        return str(e)

    # Create a query parser
    with ix.searcher(weighting=TF_IDF()) as searcher:
        query_parser = QueryParser("content", ix.schema)
        query = query_parser.parse(query_str)

        # Perform the search
        results = searcher.search(query)

        for hit in results:
            id = int(hit["id"])

            book = books_collection.find_one({"id": id})
            # print(book)
            formats = book["formats"]
            result.append({
                "id": hit["id"],
                "title": hit["title"],
                "authors_name": hit["authors_name"],
                "subjects": hit["subjects"],
                "languages": hit["languages"],
                "formats": formats,
                "_id": str(book['_id'])
            })

    data = ['Résultats de la recherche...', result]

    # save the result in the cache for 24 hours
    r.setex(query_str, 60 * 60 * 24, json.dumps(data))

    return data


if __name__ == "__main__":
    # second parameter is not used yet
    print(search_ctrl("j ", "test"))
