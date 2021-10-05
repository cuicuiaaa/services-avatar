from dataclasses import dataclass
from flask import Flask, jsonify, abort, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import requests
import random

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:root@db/result'
CORS(app)

db = SQLAlchemy(app)

@dataclass
class User(db.Model):
    id: int
    first_name: str
    last_name: str
    email: str
    test_result: bool

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    first_name = db.Column(db.String(200))
    last_name = db.Column(db.String(200))
    email = db.Column(db.String(200))
    test_result = db.Column(db.Boolean(), nullable=True)

@app.route('/api/user/<int:id>')
def index(id):
    req = requests.get('http://docker.for.mac.localhost:8000/api/user/' + str(id))
    return jsonify(req.json())

@app.route('/api/user/<int:id>', methods=['PUT'])
def updateTestResult(id):
    user = User.query.get(id)
    user.test_result = bool(random.getrandbits(1))
    db.session.commit()
    return jsonify({
        'message': 'success'
    })

@app.route('/api/user/result', methods=['POST'])
def getTestResult():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    return jsonify(user)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')