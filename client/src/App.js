import { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";

import NavBar from './components/NavBar';
import Heading from './components/Heading';
import Login from './components/Login';
import Home from './components/Home';
import Reservations from './components/Reservations';
import Reserve from './components/Reserve';
import View from './components/View';
import BoatsList from './components/BoatsList';
import ContactPage from './components/ContactPage';
import SpecialPkgs from './components/SpecialPkgs';
import Events from './components/Events';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [stateDarkMode, setDarkMode] = useState(false);
  
  const login = "/check_login";
  const times = "/times";
  const prices = "/boatTime";

  // check log in status then fetch schedule
  useEffect(() => {
    fetch(login).then(
      (resp) => {
        if (resp.ok) {
          resp.json().then(
            (user) => {
              setUser(user)
            }
          ).then(fetch(times).then(resp => resp.json())
          .then(data => setSchedule(data)))
          .then(fetch(prices).then(resp => resp.json())
          .then(data => setPricing(data)));
        }
      }
    )
  }, []);

  return (
    <div className={stateDarkMode ? 'darkMode' : null} style={{height: '100vh', width: '100%'}}>
      <Heading />
      <NavBar setDarkMode={setDarkMode}/>
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/create_res">
          {(user) ? <Reservations user={user} /> : <Login />}
        </Route>

        <Route exact path="/new_res">
          {(user) ? <Reserve schedule={schedule} pricing={pricing} username={user} /> : <Login />}
        </Route>

        <Route exact path="/view_res">
          {(user) ? <View schedule={schedule} pricing={pricing} /> : <Login />}
        </Route>

        <Route exact path="/BoatsList">
          <BoatsList />
        </Route>

        <Route exact path="/ContactPage" >
           <ContactPage stateDarkMode={stateDarkMode}/>
        </Route>

        <Route exact path="/SpecialPkgs">
           <SpecialPkgs />
        </Route>

        <Route exact path="/Events">
          <Events />
        </Route>

      </Switch>
    </div>
  );
}

export default App;

