import { React, useState } from "react";

function Reserve({schedule}) {
  const [filterDay, setFilterDay] = useState('Monday');
  const [reservation, setReservation] = useState(0);
  const [step, setStep] = useState(0);

  let days = [];
  let times = [];
  let boats = [];

  for (let record of schedule) {
    days.push(record['day']);
    times.push(record['hour']);
    boats.push(record['boats']);
  }

  function handleSelection(e) {
    setReservation(e.target.id);
    setStep(1);
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
              <div className="div-table-heading" key={index} id={index} onClick={(e) => handleSelection(e)}>
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
            <div className="div-table-heading" key={index} id={index} onClick={(e) => handleSelection(e)}>
              <div id={index} className="div-table-cell">{boat.name}</div>
              <div id={index} className="div-table-cell">{boat.capacity}</div>
              <div id={index} className="div-table-cell">$30</div>
            </div>)})}
        </div>
      </div>);
    }
}
export default Reserve;
