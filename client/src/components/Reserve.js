import { React, useState } from "react";

function Reserve({schedule, pricing}) {
  const [boat, setBoat] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);
  const [resID, setResID] = useState(1);
  const [filterDay, setFilterDay] = useState('Monday');
  const [reservation, setReservation] = useState(0);
  const [step, setStep] = useState(0);

  // de-construct the schedule object into individual indexes for populating table
  let days = [];
  let times = [];
  let boats = [];
  let time_id = []; // used for price lookup
  let price_matrix = [];

  for (let record of schedule) {
    days.push(record['day']);
    times.push(record['hour']);
    boats.push(record['boats']);
    time_id.push(record['id']);
  }

  // de-construct the pricing object and reconstruct into price matrix array
  for (let record of pricing) {
    price_matrix.push([record['boat_id'] + ':' + record['time_id'], record['id'] + ':' + record['price']]);
  }

  function getPrice(boat_id, time_id, get_id) {
    const list_price = price_matrix.filter(([key, value]) => key === `${boat_id}:${time_id}`);
    if (get_id === 1)
    {
      return list_price[0][1].split(':')[0]; // output the ID field in boat_times table
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
    setPrice(getPrice(boat_id, time_id, 0));
    setResID(getPrice(boat_id, time_id, 1)); // get the corresponding ID in boat_times table
    setBoat(properName(boat_name));
    setCapacity(boat_capacity);
    setStep(2);
  }

  function properName(name) {
    return name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  if (step === 0)
  {
    return (
      <div className="content">
        <div>Pick a day:</div>
        <select name='day' id='day' onChange={(e) => {setFilterDay(e.target.value)}}>
          <option value='Monday'>Monday</option>
          <option value='Tuesday'>Tuesday</option>
          <option value='Wednesday'>Wednesday</option>
          <option value='Thursday'>Thursday</option>
          <option value='Friday'>Friday</option>
          <option value='Saturday'>Saturday</option>
          <option value='Sunday'>Sunday</option>
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
              <div id={index} className="div-table-cell">${getPrice(boat.id, time_id[reservation], 0)}</div>
            </div>)})}
        </div>
      </div>);
    }
    else if (step === 2)
    {
      return (
        <div className="content">
          <div>You are reserving {days[reservation]} from {times[reservation]}.</div>
          <div>You picked a {boat} with capacity for {(capacity === 1) ? '1 person' : capacity + ' people'}.</div>
          <div>Your cost will be ${price} per hour starting from departure.</div>
          <div>Please check the box to sign the waiver below and click submit to store your reservation.</div>
        </div>);
    }
}
export default Reserve;
