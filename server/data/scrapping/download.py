# from schema import schema_definition
from pymongo import MongoClient
import requests
import pathlib

schema = {
    "id": int,
    "title": str,
    "authors": [{
        "name": str,
        "birth_year": int,
        "death_year": int
    }],
    "translators": list,
    "subjects": [str],
    "bookshelves": list,
    "languages": [str],
    "copyright": bool,
    "media_type": str,
    "formats": {
        "text/html": str,
        "text/html; charset=us-ascii": {
            "url": str,
            "content" : str
        },
        "application/epub+zip": str,
        "application/x-mobipocket-ebook": str,
        "application/rdf+xml": str,
        "image/jpeg": str,
        "application/octet-stream": str,
        "text/plain; charset=us-ascii": str
    },
    "download_count": int
}


def main():

    def get_book_info(book_id):
        response = requests.get(f"http://gutendex.com/books/{book_id}/")
        book_info = response.json()
        return book_info

    client = MongoClient('mongodb://localhost:27017/')
    db = client['library']

    # Create a collection
    collection = db['books']

    # Read books_ids from the file
    books_id_path = pathlib.Path(__file__).parent / "books_ids.txt"
    with open(books_id_path, "r") as file:
        books_ids = file.read().splitlines()

    for book_id in books_ids:
        if collection.find_one({'id': int(book_id)}):
            continue
        
        # Get book information from the API
        try :
            book_info = get_book_info(book_id)

            # Validate the received data against the schema
            if all(key in book_info for key in schema.keys()):
                # Replace the URL with content for "text/plain; charset=us-ascii" format
                url = book_info["formats"]["text/plain; charset=us-ascii"]
                response = requests.get(url)
                
                # Check if the request was successful (status code 200)
                if response.status_code == 200:
                    content = response.text
                
                    # Update the book_info with the fetched content
                    book_info["formats"]["text/plain; charset=us-ascii"] = {
                        "url": url,
                        "content": content
                    }
                    
                    # Insert into MongoDB if the data is valid
                    collection.insert_one(book_info)
                    print(f"Inserted book with id {book_id} into the collection.")
                else:
                    print(f"Failed to fetch content for book with id {book_id}. Status code: {response.status_code}. Skipping.")
            else:
                print(f"Invalid data for book with id {book_id}. Skipping.")
        except Exception as e:
            print(f"Failed to fetch book with id {book_id}. Error: {e}. Skipping.")
            pass


    # get size of the collection
    print(f"Collection total documents: {collection.count_documents({})}")
    print(f"Collection total size : {db.command('collstats', 'books')['size'] / 1024 / 1024} MB")

    # get unique books_ids in mongodb
    books_ids = collection.distinct("id")
    print("Unique books_ids in mongodb:", len(books_ids))



# on error, re run the main function
try:
    main()
except Exception as e:
    print(e)
    main()