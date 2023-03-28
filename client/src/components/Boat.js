  function Boat(props){
    return (
      <div className="components">
          <img src="" alt="Image of a Boat"/>
          <h1>{props.boat.name}</h1>
          <h2>Capacity: {props.boat.capacity}</h2>
          <h2></h2>
      </div>
    )
  }

  export default Boat