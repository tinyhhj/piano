import React, {useState, useEffect , useContext}from 'react';
import {Header, Context, Modal} from "../components";
import {Table} from 'react-bootstrap';
import {TicketApi} from '../api';


const Tickets = () => {
    const host = useContext(Context);
    const [ tickets , setTickets] = useState([]);
    const [ show , setShow] = useState(false);

    useEffect(()=>{ getTickets()},[]);
    const renderTickets = tickets => {
        setShow(false);
        setTickets(tickets);
    }
    const getTickets = ()=>TicketApi.getTickets(host, renderTickets);
    // async function getTickets() {
    //     const response = await fetch('/api/v1/tickets', host).then(res=>res.json());
    //     setTickets(response);
    // }
    const openModal = (mode,ticket)=>{
        setShow(true);
        modalConfig.mode = mode;
        modalConfig.ticket = ticket;
    }
    const modalConfig = {
        type:'ticket',
        mode: 'create',
        show: show,
        onHide: ()=>getTickets(),
    }

    return (
        <div className="content">
            <Header onClick={e=>openModal('create')}/>
            <Table striped bordered hover variant={"dark"}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>이름</th>
                        <th>기한</th>
                    </tr>
                </thead>
                <tbody>
                {tickets.length > 0 &&
                tickets.map((ticket,i)=> {
                    return (<tr>
                        <td>{i+1}</td>
                        <td>{ticket.student.name}</td>
                        <td>{`${ticket.start} - ${ticket.end}`}</td>
                    </tr>);
                })}
                </tbody>
            </Table>
            <Modal {...modalConfig}/>
        </div>
    )
};

export default Tickets;