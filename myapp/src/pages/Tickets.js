import React, {useState, useEffect , useContext}from 'react';
import {Header, Context, Modal, CommonUtil} from "../components";
import {Button, ButtonGroup, Table} from 'react-bootstrap';
import {TicketApi} from '../api';


const Tickets = ({student, ticketHandler}) => {
    const logger = CommonUtil.log;

    const host = useContext(Context);
    const [ tickets , setTickets] = useState([]);
    const [ show , setShow] = useState(false);
    const [mode , setMode] = useState('create');
    const [ticket, setTicket] = useState(null);

    useEffect(()=>{
        if( student) {
            logger.debug('ticket student', student);
            handleTicketClick(null);
            getTickets(student.id);
        }},[student]);
    const renderTickets = tickets => {
        setShow(false);
        setTickets(tickets);
        logger.debug('selectedTicket: ',ticket, tickets[0]);
        const selectedTicket = ticket || tickets[0];
        handleTicketClick(selectedTicket);

    };
    const getTickets = studentId=>TicketApi.getTickets(host,{studentId}, renderTickets);
    const handleTicketClick = ticket => {
        ticketHandler(ticket);
        setTicket(ticket);
    }

    const openModal = (mode,ticket)=>{
        if( !student) {
            throw new Error('학생을 먼저 선택해주세요.');
        }
        setShow(true);
        setMode(mode);
        setTicket(ticket);
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
                onClick={isActive? e=>openModal('create', null) : null}/>
            <Table striped bordered hover variant={"dark"}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>이름</th>
                        <th>시작</th>
                        <th>종료</th>
                    </tr>
                </thead>
                <tbody>
                {tickets.length > 0 &&
                tickets.map((ticket,i)=> {
                    return (<tr key={ticket.id} onClick={e=> handleTicketClick(ticket)}>
                        <td>{i+1}</td>
                        <td>{ticket.student.name}</td>
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
                                }}>삭제</Button>
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