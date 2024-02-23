from whoosh.index import open_dir
from whoosh.qparser import QueryParser
from whoosh.scoring import TF_IDF
import pathlib


def search_ctrl(query_str, params):
    result = []
    print("searching for jhhhhhhhhh: ", query_str)
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
            result.append({
                "id": hit["id"],
                "title": hit["title"],
                "authors_name": hit["authors_name"],
                "subjects": hit["subjects"],
                "languages": hit["languages"],

            })
        return result


if __name__ == "__main__":
    # second parameter is not used yet
    print(search_ctrl("j ", "test"))
