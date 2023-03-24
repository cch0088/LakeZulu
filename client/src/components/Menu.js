
import React from 'react';
import Pizza from "./Pizza"

function Menu({pizzas, setToppings, setType, setImage}) {

  return (
     <div className="menuNav">
        {pizzas.map(pizza => {
            return <Pizza
            key={pizza.id}
            {...pizza} setToppings={setToppings} setType={setType} setImage={setImage}
            />
        })}
    </div>
  );
}

export default Menu;