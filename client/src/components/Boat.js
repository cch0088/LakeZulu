import Imagegallery from "./Imagegallery";
  
  
  function Boat(props){
    return (
      <div className="eachBoat">
          <img src="./Images/kayak1.jpg" alt={props.boat.name}/>
          <h1>{props.boat.name}</h1>
          <h2>Capacity: {props.boat.capacity}</h2>
          <h2></h2>
      </div>
    )
  }

  export default Boat