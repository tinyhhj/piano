import React,{useEffect, useState} from 'react';

const Slot = ({reserved, mine, ...others})=>{
    const style = {
        backgroundColor : mine ? 'green': 'gray'
    }
    return (<td data-mine={mine} style={reserved? style: {} } {...others}></td>);
}

export default Slot;