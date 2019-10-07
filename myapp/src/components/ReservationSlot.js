import React,{useEffect, useState} from 'react';

const Slot = ({reserved, mine})=>{
    const style = {
        backgroundColor : mine ? 'green': 'gray'
    }
    return (<td style={reserved? style: {}}></td>);
}

export default Slot;