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
    const isActive = Boolean(ticket);
    logger.debug('lessons ticket: ', ticket);
    const lessonRender = lessons=> {
        setLessons(lessons);
        setShow(false);
        const selectedLesson = lesson || lessons[0];
        handleLessonClicked(selectedLesson);
    }
    const getLessons = ticketId=>setLessons(LessonApi.getLessons(host,ticketId, lessonRender));
    const openModal = (mode, lesson)=> {
        if(!ticket) {
            throw new Error('수강증을 먼저 선택해주세요.');
        }
        setShow(true);
        setMode(mode);
        setLesson(lesson);
    };
    const handleLessonClicked = lesson => {
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
        lesson: lesson,
        ticket: ticket
    };

    const finishCode = {
        true: '완료',
        false: '미완료'
    }

    return(
       <Container>
           <Row>
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
           </Row>
           {lessons.length  && lessons.map((lesson,idx)=>(
               <Row key={lesson.id}>
                   <Col>{idx}</Col>
                   <Col>{lesson.lessonDate}</Col>
                   <Col>{finishCode[lesson.finish]}</Col>
                   <Col>{lesson.memo}</Col>
               </Row>
           ))}
           <Modal {...modalConfig}></Modal>
       </Container>
    );
};

export default Lessons;