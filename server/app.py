from apis.routes.search_routes import search_bp
from flask import Flask

app = Flask(__name__)
app.register_blueprint(search_bp)


@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug=True)