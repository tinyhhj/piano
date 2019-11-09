import React,{useState, useContext,useEffect} from 'react';
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap';
import {Context,Header,Modal,CommonUtil} from '../components';
import {LessonApi, StudentApi,TicketApi} from '../api';
import './Lessons.css'

const Lessons = () => {
    const logger = CommonUtil.log;
    const host = useContext(Context);
    const [lessons, setLessons] = useState([]);
    const [show , setShow] = useState(false);
    const [mode , setMode] = useState('create');
    const [lesson, setLesson] = useState(null);
    const [ticket, setTicket] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [student, setStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const isActive = Boolean(ticket);
    const studentMap = students.reduce((acc,cur)=>{
        acc[cur.id]=cur;
        return acc;
    },{});
    const ticketMap = tickets.reduce((acc,cur)=>{
        acc[cur.id]=cur;
        return acc;
    },{});
    // logger.debug('lessons ticket: ', ticket);
    const lessonRender = lessons=> {
        setLessons(lessons);
        setShow(false);
        const selectedLesson = lesson || lessons[0];
        handleLessonClicked(selectedLesson);
    }
    const getLessons = ticketId=>setLessons(LessonApi.getLessons(host,ticketId, lessonRender));
    const getStudents = ()=> StudentApi.getStudents(host, setStudents);
    const getTickets = ()=>  TicketApi.getTickets(host,{studentId: student.id},setTickets);
    const openModal = (mode, lesson)=> {
        if(!ticket) {
            throw new Error('수강증을 먼저 선택해주세요.');
        }
        setShow(true);
        setMode(mode);
        handleLessonClicked(lesson);
    };
    const handleLessonClicked = lesson => {
        setLesson(lesson);
    }
    useEffect(()=> {
        getStudents();
    },[]);
    useEffect(()=>{
        if(student) {
            setTicket(null);
            getTickets();
        }
    },[student]);
    useEffect(()=>{
        if(ticket) {
            getLessons(ticket.id);
        } else {
            setLessons([]);
        }
    },[ticket]);

    const modalConfig = {
        mode: mode,
        type:'lesson',
        show: show,
        onHide: ()=>getLessons(ticket.id),
        lesson: lesson,
        ticket: ticket,
        size: 'lg'
    };

    const finishCode = {
        true: '완료',
        false: '미완료'
    }

    return(
       <Container id={'lesson-container'}>
           <Row>
               <Dropdown onSelect={(k,e)=>setStudent(studentMap[e.target.dataset.id])}>
                   <Dropdown.Toggle variant="success" id="dropdown-basic">
                       {(student && student.name) || '학생'}
                   </Dropdown.Toggle>
                   <Dropdown.Menu>
                       {students.map(student=><Dropdown.Item key={student.id} data-id={student.id}>{student.name}</Dropdown.Item>)}
                   </Dropdown.Menu>
               </Dropdown>
               <Dropdown onSelect={(k,e)=>setTicket(ticketMap[e.target.dataset.id])}>
                   <Dropdown.Toggle variant="success" id="dropdown-basic">
                       {(ticket && ticket.name) || '수강증'}
                   </Dropdown.Toggle>
                   <Dropdown.Menu>
                       {tickets.map(ticket=><Dropdown.Item key={ticket.id} data-id={ticket.id}>{ticket.name}</Dropdown.Item>)}
                   </Dropdown.Menu>
               </Dropdown>
               <Button variant={"primary"}
                       onClick={isActive? ()=>openModal('create',null) : null}
                       disabled={isActive? false: true}
               >+</Button>
           </Row>
           <Row>
               <Col>#</Col>
               <Col>수업일자</Col>
               <Col>수업완료</Col>
               <Col>메모</Col>
               <Col>#</Col>
           </Row>
           {lessons.length > 0 && lessons.map((lesson,idx)=>(
               <Row key={lesson.id}
                    onClick={e=>openModal('read', lesson)}>
                   <Col>{idx}</Col>
                   <Col>{lesson.lessonDate.replace('T',' ')}</Col>
                   <Col>{finishCode[lesson.finish]}</Col>
                   <Col>{lesson.memo}</Col>
                   <Col>
                       <Button variant={'primary'}
                               onClick={e=>{
                                   e.stopPropagation();
                                   openModal('update', lesson);
                               }}
                       >수정</Button>
                   </Col>
               </Row>
           ))}
           <Modal {...modalConfig}></Modal>
       </Container>
    );
};

export default Lessons;