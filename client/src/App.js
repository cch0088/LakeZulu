import { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";

import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Heading from './components/Heading';
import About from './components/About';

import './App.css';

function App() {
  // const API = "http://localhost:3000/pizzas";
  // const [pizzas, setPizzas] = useState([]);

  // useEffect(() => {
  //   fetch(API)
  //   .then(r => r.json())
  //   .then(p => setPizzas(p));
  // },[])

  return (
      <Switch>
        <div>
          <Heading />
          <NavBar />
          <div className="spacer">
          </div>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </div>
      </Switch>
  );
}

export default App;
