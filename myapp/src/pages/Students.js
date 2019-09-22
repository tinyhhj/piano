import React, {useEffect , useState, useContext} from 'react';
import {ListGroup, Button, ButtonGroup} from 'react-bootstrap';
import {Header, Modal, Context} from '../components';

import './Students.css';



const Students = () => {
    const host = useContext(Context);
    const [students , setStudents] = useState([]);
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('create');
    const [std, setStd] = useState('');
    const modalOpen = (mode,id) => {
        setMode(mode);
        setShow(true);
        setStd(id);
    };
    console.log('render... Students', students, show, mode, std);

    useEffect(()=>{
        getStudents();
    },[]);

    const modalConfig = {
        type:'student',
        mode: mode,
        show: show,
        onHide: () => {
            getStudents();
        },
        std: std
    };

    async function deleteStudent(id) {
        const url = new URL(`/api/v1/students/${id}`,host);
        await fetch(url, {method:'delete'});
        getStudents();

    }
    async function getStudents() {
        const url = new URL('/api/v1/students', host);
        const response = await fetch(url);
        const students = await response.json();
        setShow(false);
        setStudents(students.content);
    }
    return (
        <div className="content">
        <Header onClick={()=>modalOpen('create')}></Header>
            <ListGroup>
            {students.length > 0 && students.map(std=>(
                <ListGroup.Item key={std.id} onClick={()=>modalOpen('read',std.id)}>
                    {std.name}
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary" onClick={e=>{
                            e.stopPropagation();
                            modalOpen('update', std.id);
                        }}>수정</Button>
                        <Button variant="secondary" onClick={e=>{
                            e.stopPropagation();
                            deleteStudent(std.id);
                        }}>삭제</Button>
                    </ButtonGroup>
                </ListGroup.Item>))}
            </ListGroup>
            <Modal {...modalConfig} ></Modal>
        </div>
    );
};

export default Students;