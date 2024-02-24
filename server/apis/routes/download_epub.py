from flask import Blueprint, request, jsonify, send_file
from ..controller.controller_suggestions import connect_to_mongo
from bson import ObjectId
import requests
import pathlib

books_collection, _ = connect_to_mongo()


download_bp = Blueprint('download_bp', __name__)


@download_bp.route('/download_epub', methods=['GET'])
def download_epub():
    try:
        book_id = request.args.get('book_id')
        print(book_id)
        book_id = ObjectId(book_id)
        book = books_collection.find_one({"_id": book_id})

        epub = book["formats"]["application/epub+zip"]

        # download epub
        download_path = pathlib.Path(
            __file__).parent.parent.parent / "data" / "assets" / "epub" / f"{book_id}.epub"

        if download_path.exists():
            return send_file(download_path, as_attachment=True, download_name=f"{book_id}.epub")

        file = requests.get(epub).content

        with open(download_path, "wb") as f:
            f.write(file)
            print("downloaded")
        return send_file(download_path, as_attachment=True, download_name=f"{book_id}.epub")

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
