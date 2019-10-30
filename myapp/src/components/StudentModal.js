import React, {useState, useEffect, useContext} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "./index";
import StudentApi from "../api/StudentApi";
const StudentModal = ({mode,student, onHide,test}) => {
    const host = useContext(Context);
    const [login, setLogin] = useState('');
    const [name,  setName] = useState('');
    const [teacher, setTeacher] = useState(false);
    useEffect(()=>{
        if(mode === 'update' || mode === 'read') {
            StudentApi.getStudent(host, student.id, renderStudent);
        }
    },[]);
    console.log('modal', 'mode', mode, 'std',student && student.id,'name',name,'test',test, 'login',login);

    const addStudent = (name, login) =>{
        StudentApi.addStudent(host,{name,login},()=>onHide());
    }
    const handleSubmit = e =>  {
        e.preventDefault();
        if( mode === 'create') {
            verifyName();
            verifyLogin();
            addStudent();
        }
        else if( mode === 'update') {
            verifyName();
            verifyLogin();
            StudentApi.updateStudent(host,{id:student.id,name: name},onHide);
        }
    };

    function renderStudent(student) {
        setLogin(student.login);
        setName(student.name);
    }

    const verifyName = ()=> {
        if( name.length < 2) {
            throw new Error("name should be not empty");
        }
    }

    const verifyLogin= () => {

    }



    const handleNameChange = e => {setName(e.target.value);};
    const handleLoginChange = e => {setLogin(e.target.value);};


    return (
        <>
            <Modal.Header closeButton onClick={e=>{
                e.stopPropagation();
                console.log('clicked',e.target,e.target.parentElement, document.querySelector('.modal-header button.close'),e.target === document.querySelector('.modal-header button.close'));
                if(e.target === document.querySelector('.modal-header button.close') || e.target.parentElement === document.querySelector('.modal-header button.close')) {
                    onHide();
                }
            }}>
                <Modal.Title>
                    {mode === 'read' && '학생 조회'}
                    {mode === 'update' && '학생 수정'}
                    {mode === 'create' && '학생 추가'}
                </Modal.Title>
            </Modal.Header>
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>이름: </Form.Label>
                    <Form.Control type={'text'}
                                  placeholder={'조말봉'}
                                  value={name}
                                  onChange={handleNameChange}
                                  disabled={mode === 'read'? true : false}
                    />
                </Form.Group>
                <Form.Group controlId="formLogin">
                    <Form.Label>로그인: </Form.Label>
                    <Form.Control type={'text'}
                                  placeholder={mode !=='read'?'jomalbong': ''}
                                  onChange={handleLoginChange}
                                  value={login}
                                  disabled={mode === 'read'? true : false}
                    />
                </Form.Group>
                {mode !== 'read' && <Button type={"submit"}>{mode === 'update'? '수정':'저장'}</Button>}
            </Form>
        </>
    );
}
export default StudentModal;