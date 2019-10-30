import React,{useState} from 'react';
import { BrowserRouter} from "react-router-dom";
import {Container} from 'react-bootstrap';
import Navbar from "../Navbar";
import App from '../App.js'
import {Spinner, Toast} from '../components';

const Root = () => {
    return (
        <Container>
                <BrowserRouter basename={'/piano'}>
                    <Navbar></Navbar>
                    <App></App>
                </BrowserRouter>
            <Spinner></Spinner>
            <Toast></Toast>
        </Container>);
}

export default Root;