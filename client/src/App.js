import { useEffect, useState } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

import NavBar from './components/NavBar';

import './App.css';

function App() {
  const API = "http://localhost:3000/pizzas";
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch(API)
    .then(r => r.json())
    .then(p => setPizzas(p));
  },[])

  return (
      <Switch>
        <div className="App">
          <div className="spacer"></div>
          <NavBar />
          <div className="spacer"></div>
          <Route path="/about">
          </Route>
          <Route path="/options">
            {/* <PizzaBuilder 
              pizzas={filteredList}
              allToppings={allToppings}
              setOrders={setOrders}
              filters={filters}
              setFilters={setFilters}
              setToppings={setToppings}
              setType={setType}
              setImage={setImage}
              type={type}
              toppings={toppings} /> */}
          </Route>
          <Route path ="/orders">
          </Route>
          <Route path="/menu">
          </Route>
          <Route path="/home">
          </Route>
        </div>
      </Switch>
  );
}

export default App;
