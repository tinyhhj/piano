import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Students from './Students';
import Tickets from './Tickets';
import Lessons from './Lessons';
import {Spinner} from '../components';


const Home = () => {
    const [student , setStudent] = useState(null);
    const [ticket, setTicket] = useState(null);

    const studentHandler = student =>{
        setStudent(student);
    }
    const ticketHandler = ticket => {
        setTicket(ticket);
    }

    return (
        <Container>
            <Row>

                <Col>
                    <Tickets student={student}
                             ticketHandler={ticketHandler}
                    ></Tickets>
                </Col>
                <Col>
                    <Lessons ticket={ticket}></Lessons>
                </Col>
            </Row>
        </Container>
    )
};

export default Home;