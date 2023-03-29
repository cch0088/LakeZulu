import react from 'react';


class Imagegallery extends react.Component
{

    render()
    {
        let imgGallery=[
            {src:require ('./Images/kayak1.jpg'), title:'Kayak', alt:'Kayak'},
            {src:require ('./Images/jetski1.png'), title:'Jetski', alt:'Jetski'},
            {src:require ('./Images/catamaran1.jpg'), title:'Catamaran', alt:'Catamaran'},
            {src:require ('./Images/fishingboat1.jpg'), title:'Fishingboat', alt:'Fishingboat'}

        //     <img src={Kayak} title='Kayak' alt='Kayak'/>,
        //     <img src={Jetski} title='Jetski' alt='Jetski'/>,
        //     <img src={Catamaran} title='Catamaran' alt='Catamaran'/>,
        //     <img src={Fishingboat} title='Fishingboat' alt='Fishingboat'/>

        //     {src:{Kayak}, title:'Kayak', alt:'Kayak'},
        //     {src:{Jetski}, title:'Jetski', alt:'Jetski'},
        //     {src:{Catamaran}, title:'Catamaran', alt:'Catamaran'},
        //     {src:{Fishingboat}, title:'Fishingboat', alt:'Fishingboat'}
           
        ];
       return(
        <div>
            <center>
                <h1>Image Gallery From An Array</h1>
                <h3>ReactJS Tutorials</h3>
                <hr/>
                <div>   
                    {
                        imgGallery.map((index) => <img src={index.src} title={index.title} alt={index.alt} 
                        height="250" width="250" style={{border:"solid", backgroundColor:'gray'}}/>)
                    }
                   
                </div>
            </center>
        </div>
        )
    }

}
export default Imagegallery