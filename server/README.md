# Project Name

A search engine based on `TF-IDF` model.

## Table of Contents
- [Prerequesites](#prerequesites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
## Prerequesites
Before running the project. Make sure you've :
- python 3.8 or superior
- docker
>Note : You need to populate the mongodb server, and cache server. You can run `./run.sh`. This script will download all docker images of the server.


## Installation

Instructions on how to install and set up the project. You need python 3.8 or higher to run the server.

```bash
    pip install -r requirements.txt
```

Once you have installed the requirements, you also need to populate the mongodb.

You can do this by running the following command:

```bash
   cd server/data/scrapping
   python donwload.py
```

This will populate the database with the books data. Once you have done this, we need TF-IDF scores for the books. You can do this by running the following command:

```bash
    cd server/data/utils
    python woosh_initial.py
```

This will populate the database with the TF-IDF scores for the books. Once you have done this, you can run the server by running the following command:

```bash
    python app.py
```

> Note: You need to have a mongodb server running on your machine. You can install it from [here](https://www.mongodb.com/try/download/community).

## Usage

Instructions on how to use the project.
There is 4 routes in the server:

_GET_:

- /continue_reading?book_id=book_id1,book_id2...
- /books_by_genre
- /search?query=query
- /most_downloaded
- /download_epub?book_id=book_id
- /suggestions?book_id=book_id1,book_id2,...

_POST_:

- /regex_search with body: {"value" : options:["title", "author", "genre", "subject"]

## Contributing

Guidelines on how to contribute to the project.

# Contributors

- @luc-lecoutour
- @meteor314

## License

Information about the project's license.
[MIT License](https://opensource.org/licenses/MIT)
