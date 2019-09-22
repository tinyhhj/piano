import React from 'react';
import {Button} from 'react-bootstrap'

const Header = (props) =>{
    const style = {
        maxWidth: '100px',
        alignContent: 'start'
    };
    return (
        <header style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <Button style={style} {...props}>{`추가`}</Button>
        </header>
    );
};

export default Header;