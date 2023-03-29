from flask import Flask, make_response, jsonify, request, session
from flask_migrate import Migrate
from models import db, Boat, Time, BoatTime, User
import os 

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
# app.secret_key = os.environ.get('SECRET_KEY')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///boatrentals.db'
app.secret_key = 'aojhyg9835yqa-83pioa9gr9-83y6invewrpino39-4-934-89piovbapoi'

migrate = Migrate(app, db)

db.init_app(app)

# default route
@app.route("/")
def default_route():
    return make_response(jsonify(dict({"status": "Default route"})), 200)

# website registration with validation against duplicate users
@app.route("/register", methods = ['POST'])
def register():
    data = request.get_json()
    un = data.get('username')
    pw = data.get('password')

    if User.query.filter(User.username == un).first():
        return make_response(jsonify(dict({"error": "This user already exists!"})), 400)
    else:
        new_user = User(username=un, password_hash=pw)
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify(new_user.to_dict()), 201)

# website login with authentication
@app.route("/login", methods = ['POST'])
def login():
    data = request.get_json()
    un = data.get('username')
    pw = data.get('password')

    user = User.query.filter(User.username == un).first()

    if not user or user.authenticate(pw) == False:
        return make_response(jsonify(dict({"error": "The username or password is incorrect."})), 401)
    else:
        session['user_id'] = user.id
        return make_response(jsonify(user.to_dict()), 200)
    
# website login check
@app.route("/check_login")
def check_login():
    user = User.query.filter(User.id == session.get('user_id')).first()

    if not user:
        return make_response(jsonify(dict({"message": "Not Authorized"})), 401)
    else:
        return make_response(jsonify(user.to_dict()), 200)

# website logout    
@app.route("/logout", methods = ['DELETE'])
def logout():
    session['user_id'] = None
    return make_response(jsonify(dict({"message": "No Content"})), 204)
    
# route for all boats
@app.route("/boats", methods = ['GET', 'POST'])
def boats():
    # GET for all BOATS
    if request.method == 'GET':
        boats = Boat.query.all()
        boats_dict = [boat.to_dict_with_times() for boat in boats]
        return make_response(jsonify(boats_dict), 200)
        # POST for all BOATS
    elif request.method == 'POST':
        body = request.get_json()
        new_boat = Boat()
        for key, value in body.items():
            setattr(new_boat, key, value)
        db.session.add(new_boat)
        db.session.commit()
        return make_response(jsonify(new_boat.to_dict_with_times()), 201)


# route for BOAT by ID
@app.route('/boats/<id>', methods = ['GET', 'DELETE', 'PATCH'])  
def boat_by_id(id):
    boat_exists = Boat.query.get(id)
    # validates if boat exists  
    if not boat_exists:
        return jsonify({"error": "boat not found"}), 404
    if boat_exists:
        # GET for BOAT by ID
        if request.method == 'GET':
            return jsonify(boat_exists.to_dict_with_times()), 200
        # DELETE for BOAT by ID
        elif request.method == 'DELETE':
            db.session.delete(boat_exists)
            db.session.commit()
            return jsonify({"status": "DELETE successful"}), 200
        #  PATCH for BOAT by ID
        elif request.method == 'PATCH':
            body = request.get_json()
            for key, value in body.items():
                setattr(boat_exists, key, value)
            db.session.add(boat_exists)
            db.session.commit()   
            return jsonify(boat_exists.to_dict_with_times()), 200 

# route for all TIMES   
@app.route("/times", methods = ['GET', 'POST']) 
def times():
    if request.method == 'GET':
        times = Time.query.all()
        times_dict = [time.to_dict_with_boats() for time in times]
        return make_response(jsonify(times_dict), 200)
    elif request.method == 'POST':
        body = request.get_json()
        new_time = Time()
        for key, value in body.items():
            setattr(new_time, key, value)
        db.session.add(new_time)
        db.session.commit()
        return make_response(jsonify(new_time.to_dict()), 201)  

# route for TIMES by ID
@app.route("/times/<id>", methods = ['GET', 'DELETE', 'PATCH'])
def times_by_id(id):
    time_exists = Time.query.get(id)    
     # validates if time exists  
    if not time_exists:
        return jsonify({"error": "time not found"}), 404
    if time_exists:
        # GET for TIME by ID
        if request.method == 'GET':
            return jsonify(time_exists.to_dict_with_boats()), 200
        # DELETE for TIME by ID
        elif request.method == 'DELETE':
            db.session.delete(time_exists)
            db.session.commit()
            return jsonify({"status": "DELETE successful"}), 200
        #  PATCH for TIME by ID
        elif request.method == 'PATCH':
            body = request.get_json()
            for key, value in body.items():
                setattr(time_exists, key, value)
            db.session.add(time_exists)
            db.session.commit()   
            return jsonify(time_exists.to_dict_with_boats()), 200


# route for all BoatTime
@app.route("/boatTime", methods = ['GET', 'POST'])
def boatTime():
    if request.method == 'GET':
        boat_times = BoatTime.query.all()
        boat_times_dict = [bt.to_dict() for bt in boat_times]
        return make_response(jsonify(boat_times_dict), 200) 
    elif request.method == 'POST':
        body = request.get_json()
        new_boat_time = BoatTime()
        for key, value in body.items():
            setattr(new_boat_time, key, value)
        db.session.add(new_boat_time)
        db.session.commit()
        return make_response(jsonify(new_boat_time.to_dict()), 201) 
    
# route for BoatTime by ID
@app.route('/boatTime/<id>', methods = ['GET', 'DELETE', 'PATCH'])  
def boat_time_by_id(id):
    boat_time_exists = BoatTime.query.get(id)
    # validates if boatTime exists  
    if not boat_time_exists:
        return jsonify({"error": "boat-time not found"}), 404
    if boat_time_exists:
        # GET for BoatTime by ID
        if request.method == 'GET':
            return jsonify(boat_time_exists.to_dict()), 200
        # DELETE for BoatTime by ID
        elif request.method == 'DELETE':
            db.session.delete(boat_time_exists)
            db.session.commit()
            return jsonify({"status": "DELETE successful"}), 200
        # PATCH for BoatTime by ID
        elif request.method == 'PATCH':
            body = request.get_json()
            for key, value in body.items():
                setattr(boat_time_exists, key, value)
            db.session.add(boat_time_exists)
            db.session.commit()   
            return jsonify(boat_time_exists.to_dict()), 200     