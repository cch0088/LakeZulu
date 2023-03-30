import { React, useState } from "react";
import { useHistory } from "react-router-dom";

function Reserve({schedule, pricing, username}) {
  const history = useHistory();
  
  const [selectedBoat, setSelectedBoat] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);
  const [resID, setResID] = useState(1);
  const [filterDay, setFilterDay] = useState('Sunday');
  const [reservation, setReservation] = useState(0);
  const [step, setStep] = useState(0);
  const [formSigned, setFormSigned] = useState(false);

  // de-construct the schedule object into individual indexes for populating table
  let days = [];
  let times = [];
  let boats = [];
  let time_id = []; // used for price lookup
  let price_matrix = [];

  // de-construct the pricing object and reconstruct into price matrix array
  for (let record of pricing) {
    price_matrix.push([record['boat_id'] + ':' + record['time_id'], 
                        record['id'] + ':' + record['price'] + ':' + record['reserved']]);
  }

  for (let record of schedule) {
    days.push(record['day']);
    times.push(record['hour']);
    boats.push(record['boats']);
    time_id.push(record['id']);
  }

  function queryBoatTimes(boat_id, time_id, get_id) {
    const list_price = price_matrix.filter(([key, value]) => key === `${boat_id}:${time_id}`);
    if (get_id === 1)
    {
      return list_price[0][1].split(':')[0]; // output the ID field in boat_times table
    }
    else if (get_id === 2)
    {
      return list_price[0][1].split(':')[2]; // output the reserve field in boat_times table
    }
    else
    {
      return list_price[0][1].split(':')[1]; // output the price field
    }
  }

  function handleTimeSelection(e) {
    setReservation(e.target.id);
    setStep(1);
  }

  function handleBoatSelection(e, boat_id, time_id, boat_name, boat_capacity) {
    setPrice(queryBoatTimes(boat_id, time_id, 0));
    setResID(queryBoatTimes(boat_id, time_id, 1)); // get the corresponding ID in boat_times table
    setSelectedBoat(properName(boat_name));
    setCapacity(boat_capacity);
    setStep(2);
  }

  function handleReservation(e, reservation_id) {
    // run a fetch request to insert into boat_times table
    const API = "/boatTime/" + resID;

    const patchData = {
      "reserved": Object.values(username)[1]
    };

    const API_OPT = {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patchData)
    };

    fetch(API, API_OPT).then(resp => resp.json()).then(history.push("/create_res"));
  }

  function properName(name) {
    return name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // mutate the boats array to hide boats already reserved
  for (let i = 0; i < boats.length; i++)
  {
    for (let x = 0; x < boats[i].length; x++)
    {
      if (queryBoatTimes(boats[i][x].id, time_id[i], 2) !== '')
      {
        boats[i].splice(x, 1);
      }
    }
  }

  if (step === 0)
  {
    return (
      <div className="content">
        <div>Pick a day:</div>
        <select name='day' id='day' onChange={(e) => {setFilterDay(e.target.value)}}>
          <option value='Sunday'>Sunday</option>
          <option value='Monday'>Monday</option>
          <option value='Tuesday'>Tuesday</option>
          <option value='Wednesday'>Wednesday</option>
          <option value='Thursday'>Thursday</option>1
          <option value='Friday'>Friday</option>
          <option value='Saturday'>Saturday</option>
        </select>
        <div className="div-table">
          <div className="div-table-heading-title">
            <div className="div-table-cell">Day</div>
            <div className="div-table-cell">Time</div>
            <div className="div-table-cell">Available</div>
          </div>
            {boats.map((boat, index) => {
            return (
              <div className="div-table-heading" key={index} id={index} onClick={(e) => handleTimeSelection(e)}>
                {(days[index] === filterDay) ? (<div id={index} className="div-table-cell">{days[index]}</div>) : null}
                {(days[index] === filterDay) ? (<div id={index} className="div-table-cell">{times[index]}</div>) : null}
                {(days[index] === filterDay) ? (<div id={index} className="div-table-cell">{boat.length} boats</div>) : null}
              </div>)})}
        </div>
      </div>);
    }
    else if (step === 1)
    {
      return (
      <div className="content">
        <div>You are reserving {days[reservation]} from {times[reservation]}...</div>
        <div>Here is a list of available boats at this time:</div>
        <div className="div-table">
          <div className="div-table-heading-title">
            <div className="div-table-cell">Style</div>
            <div className="div-table-cell">Capacity</div>
            <div className="div-table-cell">Price per hour</div>
          </div>
          {boats[reservation].map((boat, index) => {
          return (
            <div className="div-table-heading" key={index} id={index} onClick={(e) => handleBoatSelection(e, boat.id, time_id[reservation], boat.name, boat.capacity)}>
              <div id={index} className="div-table-cell">{properName(boat.name)}</div>
              <div id={index} className="div-table-cell">{boat.capacity}</div>
              <div id={index} className="div-table-cell">${queryBoatTimes(boat.id, time_id[reservation], 0)}</div>
            </div>)})}
        </div>
      </div>);
    }
    else if (step === 2)
    {
      return (
        <div className="content">
          <div>You are reserving {days[reservation]} from {times[reservation]}.</div>
          <div>You picked a {selectedBoat} with capacity for {(capacity === 1) ? '1 person' : capacity + ' people'}.</div>
          <div>Your cost will be ${price} per hour starting from departure.</div>
          <div>Please check the box to sign the waiver below and click submit to store your reservation.</div>
          <input type='checkbox' onChange={(e) => setFormSigned(formSigned => !formSigned)}/>
          <div>I agree to all posted rules and waive my right to sue Lake Zulu for any damages.</div>
          <br /><br />
          {(formSigned)
           ? <input type='button' value='Confirm Reservation' onClick={(e) => handleReservation(e, resID)} /> 
           : <input type='button' disabled value='Confirm Reservation' />}
        </div>);
    }
}
export default Reserve;
