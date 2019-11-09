import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import {Home, Students, Lessons, Tickets , Reservations} from './pages';



function App() {

    return (
    <div className="App">
        {/*<Route path = "/teacher" component={Home}></Route>*/}
        <Route path ="/teacher/students" component={Students}></Route>
        <Route path ="/teacher/lessons" component={Lessons}></Route>
        <Route path ="/teacher/tickets" component={Tickets}></Route>
        <Route path ="/test" component={Home}></Route>
        <Route exact path = {"/"} component={Reservations}></Route>
    </div>
  );
}

export default App;
