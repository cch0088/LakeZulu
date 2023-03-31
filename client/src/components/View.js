import React from "react";

function View({schedule, pricing, username}) {

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

  return (
    <div className="content">
      <div>Viewing all reservations for {Object.values(username)[1]}</div>
      <div className="div-table">
        <div className="div-table-heading-title">
          <div className="div-table-cell">Day</div>
          <div className="div-table-cell">Time</div>
          <div className="div-table-cell">Boat</div>
          <div className="div-table-cell">Capacity</div>
          <div className="div-table-cell">Price</div>
        </div>
        {boats.map((boat, index) => {
          const arr = boat.map((b) => {
            if (queryBoatTimes(b['id'], time_id[index], 2) === Object.values(username)[1]) {
              const price = (queryBoatTimes(b['id'], time_id[index], 0))
              return [
                b['name'], 
                b['capacity'], 
                times[index], 
                days[index],
                price];
            }
            else {
              return null;
            }})
          return (
          <div className="div-table-heading" key={index} id={index}>
            <div id={index} className="div-table-cell">{arr.map(a => (a === null) ? null : a[3])}</div>
            <div id={index} className="div-table-cell">{arr.map(a => (a === null) ? null : a[2])}</div>
            <div id={index} className="div-table-cell">{arr.map(a => (a === null) ? null : a[0])}</div>
            <div id={index} className="div-table-cell">{arr.map(a => (a === null) ? null : a[1])}</div>
            <div id={index} className="div-table-cell">{arr.map(a => (a === null) ? null : '$' + a[4])}</div>
          </div>);
        })}
      </div>
    </div>);
}
export default View;
