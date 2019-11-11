import React, {useState, useEffect, useContext} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';


const Alert = ({header, body, onHide, onOk}) => {
    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onOk}>
                    Ok
                </Button>
            </Modal.Footer>
        </>
    )
};

export default Alert;
