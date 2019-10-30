import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import {Home, Students, Lessons, Tickets , Reservations} from './pages';



function App() {
  return (
    <div className="App">
        <Route exact path = {"/"} component={Reservations}></Route>
        <Route path = "/teacher" component={Home}></Route>
    </div>
  );
}

export default App;
