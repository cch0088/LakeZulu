function Boat(props){
  const boat_img = "./images/" + props.boat.name + ".jpg"

  function properName(name) {
    return name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <div className="eachBoat">
        <img src={boat_img} alt={props.boat.name}/>
        <h2>{properName(props.boat.name)}</h2>
        <h3>for {(props.boat.capacity === 1) ? '1 person' : props.boat.capacity + ' people'}</h3>
    </div>
  )
}

export default Boat