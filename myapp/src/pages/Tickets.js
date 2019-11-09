import React, {useState, useEffect , useContext}from 'react';
import {Header, Context, Modal, CommonUtil} from "../components";
import {Button, ButtonGroup, Table,Dropdown} from 'react-bootstrap';
import {TicketApi,StudentApi} from '../api';


const Tickets = ({ticketHandler}) => {
    const logger = CommonUtil.log;
    const host = useContext(Context);
    const [ tickets , setTickets] = useState([]);
    const [ show , setShow] = useState(false);
    const [ mode , setMode] = useState('create');
    const [ ticket, setTicket] = useState(null);
    const [student, setStudent] = useState(null);
    const [students, setStudents] = useState([]);
    useEffect(()=>{
        if(!students.length) {
            getStudents();
        }
        if( student) {
            logger.debug('ticket student', student);
            // handleTicketClick(null);
            getTicketsOnChangeStudent(student.id);
        }
        },[student]);
    const getStudents = ()=> StudentApi.getStudents(host, students=>{setStudents(students); logger.debug(students)});

    const renderTickets = eventName => tickets => {
        setShow(false);
        setTickets(tickets);
        logger.debug('selectedTicket: ',ticket, tickets[0]);
        const selectedTicket = eventName === 'onChangeStudent'? tickets[0] : ticket || tickets[0] || null;
        handleTicketClick(selectedTicket);
    };

    const getTicketsOnChangeStudent = studentId=>TicketApi.getTickets(host,{studentId}, renderTickets('onChangeStudent'));
    const getTickets = studentId=>TicketApi.getTickets(host,{studentId}, renderTickets('hideModal'));
    const handleTicketClick = ticket => {
        // logger.debug('ticket handler: ', ticket);
        setTicket(ticket);
    }

    const openModal = (mode,ticket)=>{
        if( !student) {
            throw new Error('학생을 먼저 선택해주세요.');
        }
        setShow(true);
        setMode(mode);
        handleTicketClick(ticket);
    }
    const modalConfig = {
        type:'ticket',
        mode: mode,
        show: show,
        onHide: ()=>{
            getTickets(student.id)
        },
        ticket: ticket,
        student: student
    };
    const isActive = Boolean(student);

    return (

        <div className="content">

            <Header
                disabled={!isActive}
                onClick={isActive? e=>openModal('create', null) : null}>
                <Dropdown onSelect={(key,e)=>setStudent(students.filter(student=>student.id === e.target.dataset.id)[0])}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {(student && student.name) || '학생'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {students.map(student=><Dropdown.Item key={student.id} data-id={student.id}>{student.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </Header>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>이름</th>
                        <th>시작</th>
                        <th>종료</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                {tickets.length > 0 &&
                tickets.map((ticket,i)=> {
                    return (<tr key={ticket.id} onClick={e=> openModal('read',ticket)}>
                        <td>{i+1}</td>
                        <td>{ticket.name}</td>
                        <td>{`${ticket.start}`}</td>
                        <td>{`${ticket.end}`}</td>
                        <td>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary" onClick={e=>{
                                    e.stopPropagation();
                                    openModal('update', ticket);
                                }}>수정</Button>
                                <Button variant="secondary" onClick={e=>{
                                    e.stopPropagation();
                                    if(ticketHandler) ticketHandler(ticket);
                                    handleTicketClick(ticket)
                                }}>&gt;</Button>
                            </ButtonGroup>
                        </td>
                    </tr>);
                })}
                </tbody>
            </Table>
            <Modal {...modalConfig}/>
        </div>
    )
};

export default Tickets;