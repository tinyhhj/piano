import React,{useState, useEffect,useContext} from 'react';
import {Button, Form, FormGroup, Modal} from 'react-bootstrap';
import {StudentApi, TicketApi} from '../api';
import { Context} from '../components';
import Calendar from "react-calendar";
import Svg from 'react-svg';

const TicketModal = ({mode}) => {
    console.log(`render ticketmodal... ${mode}`)
    const host = useContext(Context);
    const [students , setStudents] = useState([]);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const handleSubmit = e=>{
        e.preventDefault();
        if( mode === 'create') {
            addTicket(document.querySelector('select').value);
        } else if( mode === 'update') {

        }
    };
    useEffect(()=>{
        getStudents();
    },[]);
    const addTicket = (studentId)=>TicketApi.addTicket(host,{studentId,startDate: date});
    const toggleCalendar = e=>setShow(!show);
    const rednerStudents = students => setStudents(students);
    const getStudents = ()=>StudentApi.getStudents(host,rednerStudents);
    const onChange = date => setDate(date);

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
                    <Form.Label>Example select</Form.Label>
                    <Form.Control as="select">
                        <option>학생..</option>
                        {students.length && students.map(std=><option key={std.id} value={std.id}>{std.name}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCalendar">
                    <Form.Label>수강 시작일자: </Form.Label>
                    <Svg src={'../../calendar_24.svg'} onClick={toggleCalendar}/>
                    {show && <Calendar
                        onChange={onChange}
                        value={date}
                    ></Calendar>}
                </Form.Group>
                <Button type={"submit"}>{mode === 'update'? '수정':'저장'}</Button>
            </Form>
        </>
    );
}

export default TicketModal;