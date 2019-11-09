import React from 'react';
import {Button} from 'react-bootstrap'

const Header = (props) =>{
    const style = {
        maxWidth: '100px',
        alignContent: 'start'
    };
    return (
        <header style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <Button style={style} {...props}>{`+`}</Button>
            {props.children}
        </header>
    );
};

export default Header;