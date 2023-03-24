import { useEffect, useState } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

import Heading from './components/Heading';
import NavBar from './components/NavBar';
import Home from './components/Home';

import './App.css';

function App() {
  const API = "http://localhost:3000/pizzas";
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch(API)
    .then(r => r.json())
    .then(p => setPizzas(p));
  },[])

  const filteredList = pizzas.filter(pizza => {
    return pizza.vegetarian === filters.vegetarian || filters.vegetarian === "all"
  })

  return (
      <Switch>
        <div className="App">
          <Heading/>
          <NavBar />
          <div className="spacer"></div>
          <Route path="/about">
            <Contact />
          </Route>
          <Route path="/options">
            <PizzaBuilder 
              pizzas={filteredList}
              allToppings={allToppings}
              setOrders={setOrders}
              filters={filters}
              setFilters={setFilters}
              setToppings={setToppings}
              setType={setType}
              setImage={setImage}
              type={type}
              toppings={toppings} />
          </Route>
          <Route path ="/orders">
            <Orders
              orders={orders}
              setOrders={setOrders} />
          </Route>
          <Route path="/menu">
            <TopMenu
              pizzas={filteredList}
              filters={filters}
              setFilters={setFilters}
              setToppings={setToppings}
              setType={setType}
              setImage={setImage} 
              />
          </Route>
          <Route path="/home">
          <Home />
          </Route>
        </div>
      </Switch>
  );
}

export default App;
