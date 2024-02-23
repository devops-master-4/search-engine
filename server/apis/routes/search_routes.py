from flask import Blueprint, request, jsonify
from apis.controller.compute_tFidf import search_ctrl as search

from ..controller.controller_suggestions import connect_to_mongo

books_collection, _ = connect_to_mongo()

search_bp = Blueprint('search_bp', __name__)


@search_bp.route('/search', methods=['GET'])
def search_r():
    query = request.args.get('query', default='*', type=str)
    print(query)
    res = search(query, "test")
    print(res)

    return search(query, "test")


# search with regex
@search_bp.route('/regex_search', methods=['POST'])
def regex_search():
    try:
        # Assuming the search parameters are sent in the request body as JSON
        search_params = request.json
        query = {}

        for key, value in search_params.items():
            if value:
                query[key] = {"$regex": value, "$options": "i"}

        result = books_collection.find(
            query, {"_id": 1, "title": 1, "authors": 1, "download_count": 1}).limit(10)
        # convert _id to string
        result = list(result)
        for item in result:
            item["_id"] = str(item["_id"])
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
