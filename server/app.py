from apis.routes.search_routes import search_bp
from apis.routes.routes_suggestions import suggest_bp
from apis.routes.download_epub import *
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(search_bp)
app.register_blueprint(suggest_bp)
app.register_blueprint(download_bp)
CORS(app)  # Active CORS pour toutes les routes

@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug=True)
