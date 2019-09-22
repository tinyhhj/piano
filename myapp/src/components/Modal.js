import React  from 'react';
import { Modal } from 'react-bootstrap';
import StudentModal from './StudentModal';

const modal = ({show, onHide, type,...props}) => {
    const modals = {
        'student' : StudentModal
    }
    const ModalContent = modals[type];
    if( !ModalContent) {
        return null;
    }
    return(
        <Modal show={show} onHide={onHide} centered>
            <ModalContent {...props} onHide={onHide} test={Math.random()}></ModalContent>
        </Modal>
    );
};

export default modal;