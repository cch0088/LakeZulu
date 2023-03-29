import { React, useState } from "react";

function Reserve({schedule, pricing}) {
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
    price_matrix.push([record['boat_id'] + ":" + record['time_id'], record['price']]);
  }

  function getPrice(time_id, boat_id) {
    let list_price = price_matrix.filter(([key, value]) => key === `${boat_id}:${time_id}`);
    return list_price[0][1];
  }

  function handleTimeSelection(e) {
    setReservation(e.target.id);
    setStep(1);
  }

  function handleBoatSelection(e) {
    setStep(0);
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
        <div>You are reserving {days[reservation]} from {times[reservation]}</div>
        <div>Here is a list of available boats at this time:</div>
        <div className="div-table">
          <div className="div-table-heading-title">
            <div className="div-table-cell">Style</div>
            <div className="div-table-cell">Capacity</div>
            <div className="div-table-cell">Price per hour</div>
          </div>
          {boats[reservation].map((boat, index) => {
          return (
            <div className="div-table-heading" key={index} id={index} onClick={(e) => handleBoatSelection(e)}>
              <div id={index} className="div-table-cell">{properName(boat.name)}</div>
              <div id={index} className="div-table-cell">{boat.capacity}</div>
              <div id={index} className="div-table-cell">${getPrice(time_id[reservation], boat.id)}</div>
            </div>)})}
        </div>
      </div>);
    }
}
export default Reserve;
