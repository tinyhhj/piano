import React from 'react';

const hostContext = React.createContext(process.env.REACT_APP_HOST);
// const hostContext = React.createContext('http://localhost:8080');

export default hostContext;
