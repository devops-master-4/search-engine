import pymongo
import redis
import json
from bson import ObjectId

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017")

# Access a database
db = client["library"]

# Access a collection
collection = db["books"]

# Iterate over all documents in the collection
for doc in collection.find():
    # Convert MongoDB ObjectId to string
    doc['_id'] = str(doc['_id'])

    # Convert MongoDB document to JSON string
    json_data = json.dumps(doc, default=str)
    print(json_data)
    # store JSON data in Redis using RedisJSON
    r.json().set(doc['_id'], "$",  json_data)

print("All data stored in Redis as JSON.")
