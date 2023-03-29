  
  
  function Boat(props){
    const boat_img = "./images/" + props.boat.name + ".jpg"

    return (
      <div className="eachBoat">
          <img src={boat_img} alt={props.boat.name}/>
          <h1>{props.boat.name}</h1>
          <h2>Capacity: {props.boat.capacity}</h2>
          <h2></h2>
      </div>
    )
  }

  export default Boat