import React from "react";

function Reserve({schedule}) {
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
      The following days are available at this time:
      <div className="div-table">
        <div className="div-table-item">Day</div><div className="div-table-item">Time</div><div className="div-table-item">Available Units</div>
        {boats.map((boat, index) => {
          return <div className="div-table-item" key={index}>{days[index]}<div>{times[index]}</div><div>{boat.length} boats</div></div>
        })}
      </div>
    </div>
  )
}
export default Reserve;
