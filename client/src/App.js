import { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";

import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Heading from './components/Heading';
import About from './components/About';

import './App.css';

function App() {
  const server = "http://localhost:5555"

  return (
  <div>
    <Heading />
    <NavBar />
      <div className="spacer">
      </div>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/login">
      <Login server={server}/>
    </Route>
    <Route path="/register">
      <Register server={server}/>
    </Route>
  </div>
  );
}

export default App;
