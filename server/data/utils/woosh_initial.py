import os
from whoosh.fields import Schema, TEXT, ID
from whoosh.index import create_in, open_dir
from whoosh.qparser import QueryParser
from whoosh.analysis import SimpleAnalyzer
import pymongo
import pathlib


def connect_to_mongo():
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client["library"]
    books_collection = db["books"]
    tfidf_collection = db["tfidf_data"]
    return books_collection, tfidf_collection


books_collection, _ = connect_to_mongo()


def main():

    # Define the schema for the index
    schema = Schema(
        id=ID(stored=True),
        title=TEXT(stored=True),
        authors_name=TEXT(stored=True),
        subjects=TEXT(stored=True),
        languages=TEXT(stored=True),
        content=TEXT(analyzer=SimpleAnalyzer(), stored=True),
    )

    index_dir = pathlib.Path(
           __file__).parent.parent.parent.parent / "whoosh_index"

    if not os.path.exists(index_dir):
        print("Creating index directory")
        os.makedirs(index_dir)
    else:
        print("Index directory already exists, are you sure you want to overwrite it?")
        print("Press 'y' to continue or any other key to exit")
        if input() != 'y':
            exit()
        # Remove the existing index
        print("Removing existing index")
        for file in os.listdir(index_dir):
            file_path = os.path.join(index_dir, file)
            try:
                if os.path.isfile(file_path):
                    os.unlink(file_path)
            except Exception as e:
                print(e)

    ix = create_in(index_dir, schema)

    writer = ix.writer()

    for book in books_collection.find():
        authors_name = ", ".join(author["name"]
                                 for author in book.get("authors", []))
        subjects = ", ".join(book.get("subjects", []))
        languages = ", ".join(book.get("languages", []))

        writer.add_document(
            id=str(book.get("id", "")),
            title=book.get("title", ""),
            authors_name=authors_name,
            subjects=subjects,
            languages=languages,
            content=book.get("formats", {}).get(
                "text/plain; charset=us-ascii", {}).get("content", ""),
        )

    writer.commit()
    print("Index created successfully")


if __name__ == "__main__":
    main()
