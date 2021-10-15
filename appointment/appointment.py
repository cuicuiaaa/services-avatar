from dataclasses import dataclass
from flask import Flask, jsonify, abort, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:root@db/appointment'
CORS(app)

db = SQLAlchemy(app)

@dataclass
class User(db.Model):
    id: int
    first_name: str
    last_name: str
    email: str
    appointment_location: str
    appointment_date: str

    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    first_name = db.Column(db.String(200))
    last_name = db.Column(db.String(200))
    email = db.Column(db.String(200))
    appointment_location = db.Column(db.String(200), nullable=True)
    appointment_date = db.Column(db.Date(), nullable=True)

@dataclass
class Location(db.Model):
    id: int
    location: str

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(200))

@app.route('/api/user/<int:id>')
def index(id):
    req = requests.get('http://docker.for.mac.localhost:8000/api/user/' + str(id))
    return jsonify(req.json())

@app.route('/api/user/<int:id>', methods=['PUT'])
def bookCovidTest(id):
    user = User.query.get(id)
    user.appointment_location = request.json.get('appointment_location')
    user.appointment_date = request.json.get('appointment_date')
    db.session.commit()
    return jsonify({
        'message': 'success'
    })

@app.route('/api/user/<int:id>/test')
def getTestAppointment(id):
    user = User.query.get(id)
    return jsonify(user)

@app.route('/api/locations')
def getTestLocations():
    locations = Location.query.all()
    return jsonify(locations)

@app.route('/api/user/appointment', methods=['POST'])
def getUserAppointment():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    return jsonify(user)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')