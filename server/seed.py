from app import app
from models import db, Boat, Time, BoatTime
import random


# idk why this line is necessary
with app.app_context():
    # first deletes anything that's in the database
    Boat.query.delete()
    Time.query.delete()
    BoatTime.query.delete()

    #  all options for the instances
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    hours = [ '9:00-10:00','10:00-11:00','11:00-12:00','12:00-1:00','1:00-2:00','2:00-3:00','3:00-4:00','4:00-5:00','5:00-6:00',
              '9:30-10:30','10:30-11:30','11:30-12:30','12:30-1:30','1:30-2:30','2:30-3:30','3:30-4:30','4:30-5:30','5:30-6:30',]
    
    boats = [{'name': 'kayak',            'capacity': 1, 'wkday_p': 20,  'wkend_p': 30 },
             {'name': 'jet-ski',          'capacity': 2, 'wkday_p': 150, 'wkend_p': 190}, 
             {'name': 'catamaran',        'capacity': 4, 'wkday_p': 200, 'wkend_p': 250}, 
             {'name': 'speed-boat',       'capacity': 5, 'wkday_p': 210, 'wkend_p': 260},
             {'name': 'fishing-boat',     'capacity': 3, 'wkday_p': 215, 'wkend_p': 250},
             {'name': 'swan-paddle-boat', 'capacity': 3, 'wkday_p': 25,  'wkend_p': 40 }]
    
    # initial empty arrays for, to be added to db
    boats_db = []
    times_db = []
    bts_db   = []
     
    #  actually creates all instances  
    for b in boats:
        boat  = Boat(name = b['name'], capacity = b['capacity'])
        boats_db.append(boat)
        
    for x in range(len(boats_db)):
        time = Time(hour = random.choice(hours), day = random.choice(days))
        times_db.append(time)

    for b in boats:
        bt = BoatTime(boat_id = boats_db.index(random.choice(boats_db)) + 1,
                       time_id = times_db.index(random.choice(times_db)) + 1,
                       weekday_price = b['wkday_p'],
                       weekend_price = b['wkend_p'])
        bts_db.append(bt)
    
    #  adds all instances to the db and commits it
    db.session.add_all(bts_db)
    db.session.add_all(times_db)
    db.session.add_all(boats_db)
    db.session.commit()    




