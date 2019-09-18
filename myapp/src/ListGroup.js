import React, {useEffect , useState} from 'react';
import {ListGroup } from 'react-bootstrap';

const MListGroup =()=> {
    const [students , setStudents] = useState([]);

    useEffect(()=>{
        getStudents();
    },[]);

    async function getStudents() {
        const response = await fetch('/api/v1/students');
        const students = await response.json();
        setStudents(students.content);
    }

    return (
        <ListGroup>
            {students.length > 0 && students.map(std=>(<ListGroup.Item>{std.name}</ListGroup.Item>))}
        </ListGroup>
    );
};

export default MListGroup;