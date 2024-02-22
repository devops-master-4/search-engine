# schema_definition.py

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
