import React,{useState, useEffect, useContext} from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import StudentApi from "./api/StudentApi";
import {Context} from "./components";
export default ()=> {
    const host = useContext(Context);
    const [student, setStudent] = useState(null);
    useEffect(()=>{
        StudentApi.whoami(host,setStudent);
    },[])

    return (<Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">조은비 교실</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/*{student && student.role === 'TEACHER' && <Nav.Link href="/piano/teacher">관리</Nav.Link>}*/}
                    {student && student.role === 'TEACHER' && <Nav.Link href="/piano/teacher/students">학생관리</Nav.Link>}
                    {student && student.role === 'TEACHER' && <Nav.Link href="/piano/teacher/tickets">등록관리</Nav.Link>}
                    {student && student.role === 'TEACHER' && <Nav.Link href="/piano/teacher/lessons">강의관리</Nav.Link>}
                </Nav>
                {/*<Form inline>*/}
                {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                {/*    <Button variant="outline-success">Search</Button>*/}
                {/*</Form>*/}
            </Navbar.Collapse>
        </Navbar>

    )
}