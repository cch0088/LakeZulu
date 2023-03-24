from flask_sqlalchemy import  SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
   __tablename__ = 'users'

   id = db.Column(db.Integer, primary_key = True)
   name = db.Column(db.String, nullable = False)
   password = db.Column(db.String, nullable = False)

   def to_dict(self):
      return {
         "id": self.id,
         "name": self.name,
         "password": self.password
      }

# BOAT table
class Boat(db.Model):
   __tablename__ = 'boats'
   
   id = db.Column(db.Integer, primary_key = True)
   name = db.Column(db.String, nullable = False)
   capacity = db.Column(db.Integer, nullable = False)

   boat_times = db.relationship('BoatTime', backref = 'boat')

   def to_dict(self):
      return {
         "id": self.id,
         "name": self.name,
         "capacity": self.capacity
      }

   def to_dict_with_times(self):
      times = [bt.time for bt in self.boat_times]
      return {
         "id": self.id,
         "name": self.name,
         "capacity": self.capacity,
         "times": [time.to_dict() for time in times]
      }
      
# Times table
class Time(db.Model):
   __tablename__ = 'times'
   
   id = db.Column(db.Integer, primary_key = True)
   hour = db.Column(db.String, nullable = False)
   day = db.Column(db.String, nullable = False)

   boat_times = db.relationship('BoatTime', backref = 'time')

   def to_dict(self):
    return {
       "id": self.id,
       "hour": self.hour,
       "day": self.day
    }
    
   def to_dict_with_boats(self):
    boats = [bt.boat for bt in self.boat_times]
    return {
       "id": self.id,
       "hour": self.hour,
       "day": self.day,
       "boats": [boat.to_dict() for boat in boats]
    }

# BoatTimes table
class BoatTime(db.Model):
   __tablename__ = 'boat_times'
   
   id = db.Column(db.Integer, primary_key = True)

   boat_id = db.Column(db.Integer, db.ForeignKey('boats.id'), nullable  = False)
   time_id = db.Column(db.Integer, db.ForeignKey('times.id'), nullable  = False)

   def to_dict(self):
       return {
          "id": self.id,
          "boat_id": self.boat_id,
          "time_id": self.time_id
       }
   