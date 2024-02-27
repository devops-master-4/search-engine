from locust import HttpUser, task


class MyUser(HttpUser):

    @task
    def search_endpoint(self):
        self.client.get("/search?q=the")

    @task
    def regex_search_endpoint(self):
        self.client.post(
            "/regex_search", json={"value": "a$", "options": ["title", "authors.name"]})

    @task
    def suggest_endpoint(self):
        self.client.get(
            "/suggestions?book_id=65d4cf6e92a664997f160345,65d4cf6c92a664997f1603")

    @task
    def download_endpoint(self):
        self.client.get("/download_epub?book_id=65d4cf7192a664997f160346")

    @task
    def hello_world_endpoint(self):
        self.client.get("/")


# exectute the test
