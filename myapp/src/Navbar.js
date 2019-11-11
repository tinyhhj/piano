import React,{useState, useEffect, useContext} from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import StudentApi from "./api/StudentApi";
import {Context} from "./components";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ClassIcon from '@material-ui/icons/Class';
import {SvgIcon} from "@material-ui/core";
export default ()=> {
    const host = useContext(Context);
    const [student, setStudent] = useState(null);
    useEffect(()=>{
        StudentApi.whoami(host,setStudent);
    },[])

    return (<Navbar bg="light" expand="lg">
            <Navbar.Brand href="/piano"><SvgIcon style={{width:'36px',height:'36px'}} viewBox="0 0 24 24">
                <path fill="#000000" d="M14,12H15.5V14.82L17.94,16.23L17.19,17.53L14,15.69V12M4,2H18A2,2 0 0,1 20,4V10.1C21.24,11.36 22,13.09 22,15A7,7 0 0,1 15,22C13.09,22 11.36,21.24 10.1,20H4A2,2 0 0,1 2,18V4A2,2 0 0,1 4,2M4,15V18H8.67C8.24,17.09 8,16.07 8,15H4M4,8H10V5H4V8M18,8V5H12V8H18M4,13H8.29C8.63,11.85 9.26,10.82 10.1,10H4V13M15,10.15A4.85,4.85 0 0,0 10.15,15C10.15,17.68 12.32,19.85 15,19.85A4.85,4.85 0 0,0 19.85,15C19.85,12.32 17.68,10.15 15,10.15Z" />
            </SvgIcon></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/*{student && student.role === 'TEACHER' && <Nav.Link href="/piano/teacher">관리</Nav.Link>}*/}
                    {student && student.role === 'TEACHER' && <Nav.Link href="/piano/teacher/students"><PeopleIcon/></Nav.Link>}
                    {student && student.role === 'TEACHER' && <Nav.Link href="/piano/teacher/tickets"><ConfirmationNumberIcon/></Nav.Link>}
                    {student && student.role === 'TEACHER' && <Nav.Link href="/piano/teacher/lessons"><ClassIcon/></Nav.Link>}
                    {student && <Nav.Item>
                        <Nav.Link href={"/piano/logout"}><ExitToAppIcon></ExitToAppIcon></Nav.Link>
                    </Nav.Item>}
                </Nav>
                {/*<Form inline>*/}
                {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                {/*    <Button variant="outline-success">Search</Button>*/}
                {/*</Form>*/}
            </Navbar.Collapse>
        </Navbar>

    )
}