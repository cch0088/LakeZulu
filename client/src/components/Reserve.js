import React from "react";

function Reserve() {
  const API = "/times";

  fetch(API).then(resp => resp.json())
  .then(data => {
    for (let record of data) {
      console.log(record['day']);
      console.log(record['hour']);
      console.log(record['boats']);
    }
  });
  return (
    <div className="content">
      The following days are available at this time:
    </div>
  )
}
export default Reserve;
