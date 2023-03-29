function Boat(props){
  const boat_img = "./images/" + props.boat.name + ".jpg"

  function properName(name) {
    return name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <div className="eachBoat">
        <img src={boat_img} alt={props.boat.name}/>
        <h1>{properName(props.boat.name)}</h1>
        <h2>Capacity: {props.boat.capacity}</h2>
    </div>
  )
}

export default Boat