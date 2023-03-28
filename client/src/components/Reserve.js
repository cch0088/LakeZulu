import React from "react";

function Reserve({schedule}) {
  let days = [];

  for (let record of schedule) {
    days.push(record['day']);
  }

  return (
    <div className="content">
      The following days are available at this time:
      {days.map((day, index) => {return <p key={index}>{day}</p>})}
    </div>
  )
}
export default Reserve;
