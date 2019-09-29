import React,{useState, useEffect,useContext} from 'react';
import {Button, Form, FormGroup, Modal} from 'react-bootstrap';
import {StudentApi, TicketApi} from '../api';
import { Context, CommonUtil} from '../components';
import Calendar from "react-calendar";
import Svg from 'react-svg';

const TicketModal = ({mode,student, onHide ,ticket}) => {
    console.log(`render ticketmodal... ${mode}`)
    const host = useContext(Context);
    const [date, setDate] = useState(mode !== 'create'? ticket.start :CommonUtil.getDate(new Date()));
    const [endDate, setEndDate] = useState(ticket?ticket.end : '');
    const handleSubmit = e=>{
        e.preventDefault();
        if( mode === 'create') {
            addTicket(document.querySelector('select').value);
        } else if( mode === 'update') {
            updateTicket();
        } else if( mode === 'read') {

        }
    };
    useEffect(()=>{
    },[]);
    const addTicket = (studentId)=>TicketApi.addTicket(host,{studentId,startDate: date}, ()=>onHide());
    const updateTicket = () => TicketApi.updateTicket(host, {studentId: ticket.student.id, ticketId: ticket.id, startDate: date, endDate: endDate}, ()=>onHide());

    const onChange = e => {
        setDate(e.target.value);
    }

    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === 'read' && '수강증 조회'}
                    {mode === 'update' && '수강증 수정'}
                    {mode === 'create' && '수강증 추가'}
                </Modal.Title>
            </Modal.Header>
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>이름: </Form.Label>
                    <Form.Control as="select"
                        disabled={true}>
                        <option value={student.id}>{student.name}</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formStart">
                    <Form.Label>수강 시작일자: </Form.Label>
                    <Form.Control
                        type={'date'}
                        value={date}
                        onChange={onChange}
                        disabled={mode === 'read'? true: false}/>
                    {/*<Svg src={'../../calendar_24.svg'} onClick={toggleCalendar}/>*/}
                    {/*{show && <Calendar*/}
                    {/*    onChange={onChange}*/}
                    {/*    value={date}*/}
                    {/*></Calendar>}*/}
                </Form.Group>
                {
                    mode !== 'create' &&
                    <Form.Group controlId="formEnd">
                    <Form.Label>수강 종료일자: </Form.Label>
                    <Form.Control
                        type={'date'}
                        value={endDate}
                        onChange={e=>setEndDate(e.target.value)}
                        disabled={mode === 'read'? true: false}/>
                    {/*<Svg src={'../../calendar_24.svg'} onClick={toggleCalendar}/>*/}
                    {/*{show && <Calendar*/}
                    {/*    onChange={onChange}*/}
                    {/*    value={date}*/}
                    {/*></Calendar>}*/}
                </Form.Group>}
                {mode !== 'read' && <Button type={"submit"}>{mode === 'update'? '수정':'저장'}</Button>}
            </Form>
        </>
    );
}

export default TicketModal;