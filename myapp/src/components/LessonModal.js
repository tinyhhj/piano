import React, {useState, useContext, useEffect} from 'react';
import {Context, CommonUtil} from '../components';
import {Modal, Form, Button} from 'react-bootstrap';
import {LessonApi} from "../api";

const LessonModal = ({ticket, lesson, mode, onHide}) => {
    const logger = CommonUtil.log;
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString();
    const host = useContext(Context);
    const [memo,setMemo] = useState('');
    const [finish, setFinish] = useState(false);
    const [lessonDate, setLessonDate] = useState(today.substring(0,today.length-8));
    logger.debug("Lesson modal props: ",ticket, lesson, mode, onHide);
    const handleSubmit = e => {
        e.preventDefault();
        if( mode === 'create') {
            addLessons(ticket.id, {
                memo:memo,
                finish:finish,
                lessonDate: lessonDate,
            })
        }
    }
    const onChange = e=> e.currentTarget.value;
    const changeLessonDate = v=>setLessonDate(v);
    const changeLessonFinish= v=>setFinish(v);
    const changeLessonMemo = v=>setMemo(v);
    const pipe = (...funcs)=>init=>funcs.reduce((a,b)=>b(a),init);
    const onChangeLessonDate = pipe(onChange,changeLessonDate);
    const onChangeLessonFinish = pipe(onChange, changeLessonFinish);
    const onChangeLessonMemo = pipe(onChange, changeLessonMemo);
    const addLessons = (ticketId,lesson)=>LessonApi.addLesson(host,{ticketId,...lesson}, ()=>onHide());

    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === 'read' && '수업 조회'}
                    {mode === 'update' && '수업 수정'}
                    {mode === 'create' && '수업 생성'}
                </Modal.Title>
            </Modal.Header>

            <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            수업일자:
                        </Form.Label>
                        <Form.Control
                            onChange={onChangeLessonDate}
                            value={lessonDate}
                        type={'datetime-local'}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={'lesson-finish'}>
                        <Form.Label>
                            수업완료:
                        </Form.Label>
                        <Form.Control
                            value={finish}
                            onChange={onChangeLessonFinish}
                            as={'select'}>
                            <option value={false}>미완료</option>
                            <option value={true}>완료</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={'lesson-memo'}>
                        <Form.Label>
                            메모:
                        </Form.Label>
                        <Form.Control
                            value={memo}
                            onChange={onChangeLessonMemo}
                            type={'textarea'}>
                        </Form.Control>
                    </Form.Group>
                {mode !== 'read' && <Button type={"submit"}>{mode === 'update'? '수정':'저장'}</Button>}
                </Form>

        </>
    );

}
export default LessonModal;