import { React, useState } from "react";

function Reserve({schedule}) {
  const [filterDay, setFilterDay] = useState('Monday');

  let days = [];
  let times = [];
  let boats = [];

  for (let record of schedule) {
    days.push(record['day']);
    times.push(record['hour']);
    boats.push(record['boats']);
  }

  return (
    <div className="content">
      Pick a day:
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
            <div className="div-table-heading" key={index} id={index} onClick={(e) => console.log(e.target.id)}>
            {(days[index] == filterDay) ? (<div id={index} className="div-table-cell">{days[index]}</div>) : null}
            {(days[index] == filterDay) ? (<div id={index} className="div-table-cell">{times[index]}</div>) : null}
            {(days[index] == filterDay) ? (<div id={index} className="div-table-cell">{boat.length} boats</div>) : null}
          </div>)})}
      </div>
    </div>)
}
export default Reserve;
