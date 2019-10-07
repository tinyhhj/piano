import React,{useState} from 'react';
import { BrowserRouter} from "react-router-dom";
import {Container} from 'react-bootstrap';
import Navbar from "../Navbar";
import App from '../App.js'
import {Spinner} from '../components';

const Root = () => {
    return (
        <Container>
                <BrowserRouter>
                    <Navbar></Navbar>
                    <App></App>
                </BrowserRouter>
            <Spinner></Spinner>
        </Container>);
}

export default Root;