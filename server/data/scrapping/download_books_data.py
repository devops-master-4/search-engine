import requests
from bs4 import BeautifulSoup
import time

start = time.time()
# create 1664 urls to scrape
urls = [
    f"https://www.gutenberg.org/ebooks/search/?query=&sort_order=downloads&start_index={i}" for i in range(0, 1676, 25)]
print("Number of urls:", len(urls))


def get_books_ids(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    books = soup.find_all("li", class_="booklink")
    books_ids = [book.find("a")["href"].split("/")[-1] for book in books]
    return books_ids


for url in urls:
    books_ids = get_books_ids(url)
    # write the books_ids to a file
    with open("books_ids.txt", "a") as file:
        for book_id in books_ids:
            file.write(f"{book_id}\n")
print("Done in", time.time() - start, "seconds")


