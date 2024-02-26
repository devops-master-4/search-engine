from flask import Blueprint, request, jsonify
from apis.controller.compute_tFidf import search_ctrl as search
from ..controller.controller_suggestions import *
from ..controller.controller_suggestion_books import *

suggest_bp = Blueprint('suggest_bp', __name__)


@suggest_bp.route('/most_downloaded', methods=['GET'])
def most_downloaded():
    try:
        result = get_most_downloaded_books()
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


@suggest_bp.route('/random_books', methods=['GET'])
def random_books():
    try:
        result = get_random_books()
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


@suggest_bp.route('/books_by_genre', methods=['GET'])
def books_by_genre():
    try:
        result = get_books_by_genre()
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


@suggest_bp.route('/continue_reading', methods=['GET'])
def continue_reading():
    # get the id of the book from the request
    books_id = request.args.get('book_id', default='*', type=str)
    print(books_id)
    # split the id to get the book id
    book_id = books_id.split(",")
    try:
        result = get_continue_reading(book_id)
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


@suggest_bp.route('/suggestions', methods=['GET'])
def suggestions():
    # get the id of the book from the request
    books_id = request.args.get('book_id', type=str)
    if books_id is None:
        return jsonify({"status": "error", "message": "No book_id provided"})

    try:
        result = get_suggestions_for_books(books_id)
        return jsonify({"status": "success", "data": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
