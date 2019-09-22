import React from 'react';
import { BrowserRouter} from "react-router-dom";
import Navbar from "../Navbar";
import App from '../App.js'
const host = React.createContext('http://localhost:8080');


const Root = () => {
    return (
            <BrowserRouter>
                <Navbar></Navbar>
                <App></App>
            </BrowserRouter>);
}

export default Root;