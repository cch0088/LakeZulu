import React from "react";

function View({schedule}) {

  

  return (
    <div className="content">
      <div className="div-table">
        <div className="div-table-heading-title">
          <div className="div-table-cell">Day</div>
          <div className="div-table-cell">Time</div>
          <div className="div-table-cell">Boat</div>
        </div>
          {/* {boats.map((boat, index) => {
          return (
            <div className="div-table-heading" key={index} id={index} onClick={(e) => handleTimeSelection(e)}>
              {(days[index] === filterDay) ? (<div id={index} className="div-table-cell">{days[index]}</div>) : null}
              {(days[index] === filterDay) ? (<div id={index} className="div-table-cell">{times[index]}</div>) : null}
              {(days[index] === filterDay) ? (<div id={index} className="div-table-cell">{boat.length} boats</div>) : null}
            </div>)})} */}
      </div>
    </div>);
}
export default View;
