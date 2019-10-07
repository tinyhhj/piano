import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import {Home, Students, Lessons, Tickets , Reservations} from './pages';



function App() {
  return (
    <div className="App">
        <Route exact path = "/" component={Home}></Route>
        <Route path = "/admin/students" component={Students}></Route>
        <Route path = "/admin/lessons" component={Lessons}></Route>
        <Route path = "/admin/tickets" component={Tickets}></Route>
        <Route path = "/students/reservations" component={Reservations}></Route>
    </div>
  );
}

export default App;
