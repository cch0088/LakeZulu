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
        <table>
          <tr className="bold">
            <td>Day</td>
            <td>Time</td>
            <td>Available Units</td>
          </tr>
          {boats.map((boat, index) => {
            return (
            <tr className="select" key={index}>
              <td>{days[index]}</td>
              <td>{times[index]}</td>
              <td>{boat.length}</td>
            </tr>)})}
        </table>
      </div>
    </div>)
}
export default Reserve;
