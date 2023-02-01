import requests
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


def get_bearer_token():
    with open("bearer_token.txt", "r") as file:
        return file.read().strip()


@app.route("/get_records/<int:record_id>", methods=["GET"])
def get_records(record_id):
    header = {"Authorization": f"Bearer {get_bearer_token()}"}
    data = {
        "id": record_id
    }
    payload = {}
    response = requests.request(
        "GET", "https://personalization.us-west-2.hightouch.com/v1/collections/mycustomers/records/id/"+str(record_id), headers=header, data=payload)

    return jsonify(response.json())


if __name__ == "__main__":
    app.run(debug=True)
