import React, {useState, useEffect, useContext} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "./index";
import {Calendar} from 'react-calendar';
const StudentModal = ({mode,student, onHide,test}) => {
    const host = useContext(Context);
    const [email, setEmail] = useState('');
    const [name,  setName] = useState('');
    useEffect(()=>{
        if(mode === 'update' || mode === 'read') {
            getStudent(student.id);
        }
    },[]);
    console.log('modal', 'mode', mode, 'std',student && student.id,'name',name,'test',test);

    async function addStudents() {
        var url = new URL('/api/v1/students', host),
            params = {name: name, email: email};
        Object.keys(params).forEach(k => url.searchParams.append(k,params[k]))
        const response = await fetch(url, {method: 'post'})
            .then(res=>res.json());
        onHide();
    }
    const handleSubmit = e =>  {
        e.preventDefault();
        if( mode === 'create') {
            verifyName();
            verifyEmail();
            addStudents();
        }
        else if( mode === 'update') {
            verifyName();
            verifyEmail();
            updateStudent(student.id);
        }
    };

    const verifyName = ()=> {
        if( name.length < 2) {
            throw new Error("name should be not empty");
        }
    }

    const verifyEmail= () => {

    }

    async function updateStudent(id) {
        var url = new URL(`/api/v1/students/${id}`, host);
        url.searchParams.append('name', name);
        await fetch(url, {method:'put'}).then(res=>res.json());
        onHide();
    }

    async function getStudent(id) {
        var url = new URL(`/api/v1/students/${id}`, host);
        const {name , email} = await fetch(url).then(res=>res.json());
        console.log('getStudent',name, email);
        setName(name);
        // setEmail(email);
    }

    const handleNameChange = e => {setName(e.target.value);};
    const handleMailChange = e => setEmail(e.target.value);


    return (
        <>
            <Modal.Header closeButton>
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
                <Form.Group controlId="formEmail">
                    <Form.Label>이메일: </Form.Label>
                    <Form.Control type={'email'}
                                  placeholder={mode !=='read'?'jomalbong@google.com': ''}
                                  onChange={handleMailChange}
                                  value={email}
                                  disabled={mode === 'read'? true : false}
                    />
                </Form.Group>
                {mode !== 'read' && <Button type={"submit"}>{mode === 'update'? '수정':'저장'}</Button>}
            </Form>
        </>
    );
}
export default StudentModal;