import { useEffect } from "react"
import { useState } from "react"
import Boat from "./Boat"


function BoatsList(){
    //  state for the boats and times
    const [stateBoats, setBoats] = useState([])
    const [stateTimes, setTimes] = useState([])

    // fetch for all the boats
    useEffect( () => {
        fetch("/boats")
        .then(resp => resp.json())
        .then(data => setBoats(data), console.log(stateBoats))
    }, [])
    
    // fetch for all the times
    useEffect( () => {
        fetch("/times")
        .then(resp => resp.json())
        .then(data => setTimes(data), console.log(stateTimes))
    }, [])
    


    return (
        <div id="allBoats">
            {stateBoats.map(boat => <Boat key={boat.id}
                                              boat={boat}
                                              stateTimes={stateTimes}/>)}
           
        </div>
    )
}

export default BoatsList