import React,{useState, useContext,useEffect} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {Context,Header,Modal,CommonUtil} from '../components';
import {LessonApi} from '../api';

const Lessons = ({ticket}) => {
    const logger = CommonUtil.log;
    const host = useContext(Context);
    const [lessons, setLessons] = useState([]);
    const [show , setShow] = useState(false);
    const [mode , setMode] = useState('create');
    const [lesson, setLesson] = useState(null);
    logger.debug('lessons ticket: ', ticket);
    const lessonRender = lessons=> {
        setLessons(lessons);
        setShow(false);
    }
    const getLessons = ticketId=>setLessons(LessonApi.getLessons(host,ticketId, lessonRender));
    const addLessons = (ticketId,lesson)=>LessonApi.addLesson(host,{ticketId,...lesson}, setLessons);
    const openModal = (mode, lesson)=> {
        if(!ticket) {
            throw new Error('수강증을 먼저 선택해주세요.');
        }
        setShow(true);
        setMode(mode);
        setLesson(lesson);
    }
    useEffect(()=>{
        if( ticket) {
            getLessons(ticket.id);
        }
    },[ticket]);

    const modalConfig = {
        mode: mode,
        type:'lesson',
        show: show,
        onHide: ()=>getLessons(ticket.id),
        lesson: lesson
    }

    return(
       <Container>
           <Row>
               <Button variant={"primary"} onClick={()=>openModal('create',null)}>+</Button>
           </Row>
           <Row>
               <Col>#</Col>
               <Col>lesson</Col>
           </Row>
           {lessons.length  && lessons.map((lesson,idx)=>(
               <Row>
                   <Col>{idx}</Col>
                   <Col></Col>
               </Row>
           ))}
           <Modal {...modalConfig}></Modal>
       </Container>
    );
};

export default Lessons;