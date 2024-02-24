from pymongo import MongoClient
import requests
import pathlib


def download_cover():

    client = MongoClient('mongodb://localhost:27017/')
    db = client['library']

    # Create a collection
    collection = db['books']

    # get covers for each book
    for book in collection.find():

        id = book['_id']
        file_path = pathlib.Path.absolute(pathlib.Path(
            __file__).parent.parent) / 'assets' / 'covers' / f'{id}.jpg'

        if file_path.exists():
            print(f"Cover already exists for book with id: {id}, skipping...")
            continue

        try:
            # formats
            formats = book['formats']['image/jpeg']
            # get the cover
            cover = requests.get(formats)
            print(file_path)
            cover_file = open(file_path, 'wb')
            cover_file.write(cover.content)
            cover_file.close()
        except:
            # get the cover
            cover = requests.get(
                'https://w0.peakpx.com/wallpaper/806/986/HD-wallpaper-ffx-yuna-final-fantasy-10-final-fantasy-x-yuna.jpg')

            print("No cover found for book with id, using default cover :", id)
            cover_file = open(file_path, 'wb')
            cover_file.write(cover.content)
            cover_file.close()


download_cover()
