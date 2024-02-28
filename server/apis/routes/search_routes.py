from flask import Blueprint, request, jsonify
from apis.controller.compute_tFidf import search_ctrl as search

from ..controller.controller_suggestions import connect_to_mongo
import redis
import json


books_collection, _ = connect_to_mongo()

search_bp = Blueprint('search_bp', __name__)


@search_bp.route('/search', methods=['GET'])
def search_r():
    query = request.args.get('query', default='*', type=str)
    # print(search(query, "test"))
    # return search(query, "test")
    result = search(query, "test")
    result = list(result)
    return jsonify({"status": "success", "data": result})


# search with regex
r = redis.StrictRedis(host='localhost', port=6379, db=0)


@search_bp.route('/regex_search', methods=['POST'])
def regex_search():
    try:

        # {"value":"ddd","options":["languages","authors","title","subjects"]}
        # make a search in the database with the value for any  on the contained options
        params = request.json
        options = params["options"]
        value = params["value"]

        options_keys = "".join(options)

        if r.exists(value + options_keys):
            print("query found in cache")
            data = json.loads(r.get(value+options_keys))

            return jsonify({"status": "success", "data": data})
            #return json.loads(r.get(value))

        query = {
            "$or": [
                {option: {"$regex": value, "$options": "i"}}
                for option in options
            ]
        }

        result = list(books_collection.find(
            query, {"_id": 1, "title": 1, "authors": 1, "download_count": 1, "formats": 1}).limit(10))

        for res in result:
            res["_id"] = str(res["_id"])

        data = ['Résultats de la recherche...', result]
        #  r.setex(query_str, 60 * 60 * 24, json.dumps(data))
        r.setex(value+options_keys, 60 * 60 * 24, json.dumps(data))

        return jsonify({"status": "success", "data": data})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
