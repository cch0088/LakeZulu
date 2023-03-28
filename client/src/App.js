import { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";

import NavBar from './components/NavBar';
import Heading from './components/Heading';
import Login from './components/Login';
import Home from './components/Home';
import Reservations from './components/Reservations';
import Reserve from './components/Reserve';
import View from './components/View';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [schedule, setSchedule] = useState([]);
  
  const login = "/check_login";
  const API = "/times";

  // check log in status
  useEffect(() => {
    fetch(login).then(
      (resp) => {
        if (resp.ok) {
          resp.json().then(
            (user) => {
              setUser(user)
            }
          ).then(fetch(API).then(resp => resp.json())
          .then(data => setSchedule(data)));
        }
      }
    )
  }, []);

  return (
    <div>
      <Heading />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create_res">
          {(user) ? <Reservations user={user} /> : <Login />}
        </Route>
        <Route path="/new_res">
          {(user) ? <Reserve schedule={schedule} /> : <Login />}
        </Route>
        <Route path="/view_res">
          {(user) ? <View schedule={schedule} /> : <Login />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;

