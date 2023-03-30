

function Events(){
   return (
      <div className="content">
         <section>
         <div className = "leftBox">
            < div className = "content">
               <h1>Events</h1>
               <p>Our next event will be Fourth of July Celebration, bring
                  your family and friends and enjoy the fun. We will have 12 foodtrucks, 
                  music, and fireworks at 10pm. Don't forget to bring your own blanket,
                  chairs to be comfortable. We look forward to seeing you all there!
               </p>
            </div>
         </div>
         <div className = "events">
            <ul>
               <li>
                  <div >
                     <h2>4<span>July</span></h2>
                  </div>
                  <div className= "details">
                     <h3>Lots of Fireworks</h3>
                        <p> Come enjoy the fireworks with your family and friends and don't forget to 
                           book one of our packages.
                        </p>
                        <a href = "#">View Details</a>
                  </div>
                     {/* <div style = "clear: both; "></div>  */}
               </li>
            </ul>
         </div>
         </section>
      </div>
   )
  }
  
  
  


export default Events