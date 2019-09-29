import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../components';
import {Modal,Form} from 'react-bootstrap';

const LessonModal = ({ticket, lesson, mode, onHide}) => {
    const host = useContext(Context);
    const handleSubmit = () => {}
    return(
        <>
            <Modal.Header>
                <Modal.Title>
                    {mode === 'read' && '수업 조회'}
                    {mode === 'update' && '수업 수정'}
                    {mode === 'create' && '수업 생성'}
                </Modal.Title>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            수업 일자:
                        </Form.Label>
                        <Form.Control
                        type={'datetime'}>

                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Header>
        </>
    );

}
export default LessonModal;