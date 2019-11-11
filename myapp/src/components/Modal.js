import React  from 'react';
import { Modal } from 'react-bootstrap';
import StudentModal from './StudentModal';
import TicketModal from './TicketModal';
import LessonModal from './LessonModal';
import AlertModal from './AlertModal';

const modal = ({show, onHide, type, size,...props}) => {
    const modals = {
        'student' : StudentModal,
        'ticket': TicketModal,
        'lesson': LessonModal,
        'alert': AlertModal
    }
    const ModalContent = modals[type];
    if( !ModalContent) {
        return null;
    }
    console.log( 'modal props:' ,props);
    return(
        <Modal show={show}
               onHide={onHide}
               size={size ? size : 'sm'}
               centered>
            <ModalContent {...props} onHide={onHide} test={Math.random()}></ModalContent>
        </Modal>
    );
};

export default modal;