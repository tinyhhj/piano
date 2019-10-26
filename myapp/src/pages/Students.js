import React, {useEffect , useState, useContext} from 'react';
import {ListGroup, Button, ButtonGroup} from 'react-bootstrap';
import {Header, Modal, Context, CommonUtil} from '../components';
import {StudentApi} from '../api';

const Students = ({studentHandler}) => {
    const logger = CommonUtil.log;
    const host = useContext(Context);
    const [students , setStudents] = useState([]);
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('create');
    const [student, setStudent] = useState(null);
    const modalOpen = (mode,student) => {
        setMode(mode);
        setShow(true);
        // setStudent(student);
        handleStudentClick(student);
    };
    logger.debug('render... Students', students, show, mode,student);

    useEffect(() => {
       getStudents();
    },[]);

    const modalConfig = {
        type:'student',
        mode: mode,
        show: show,
        onHide: ()=>{getStudents()},
        student: student
    };

    const deleteStudent = id => StudentApi.deleteStudent(host, id, getStudents);
    const handleStudentClick = student => {
        setStudent(student);
    }
    const getStudents = () => StudentApi.getStudents(host, renderStudent);
    const renderStudent = students=> {
        setShow(false);
        setStudents(students.filter(student=>student.role !== 'TEACHER'));
        const selectStduent = student || students[0];
        handleStudentClick(selectStduent);
    }

    return (
        <div className="content">
            <Header onClick={()=>modalOpen('create', null)}></Header>
            <ListGroup>
                {students.length > 0 && students.map(std=>(
                    <ListGroup.Item key={std.id} onClick={e=>modalOpen('read',std)} active={student && student.id === std.id}>
                        {std.name}
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary" onClick={e=>{
                                e.stopPropagation();
                                modalOpen('update', std);
                            }}>수정</Button>
                            <Button variant="secondary" onClick={e=>{
                                e.stopPropagation();
                                if(studentHandler) studentHandler(std);
                                handleStudentClick(std);
                            }}>&gt;</Button>
                        </ButtonGroup>
                    </ListGroup.Item>))}
            </ListGroup>
            <Modal {...modalConfig} ></Modal>
        </div>
    );
};

export default Students;