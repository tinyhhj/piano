import React ,{useState, useEffect, useContext}from 'react';
import {Spinner} from 'react-bootstrap';
import {v4} from 'uuid';

export default function MSpinner() {
    const [style, setStyle] = useState('border');
    const [show, setShow] = useState(false);
    const [ids , setIds] = useState([]);
    const add = () => {
        const id = v4();
        setIds(ids.slice().push(id))
        setShow(true);
    }

    const remove = id=> {
        setIds(ids.slice(1));
        if( ids.length <= 1) {
            setShow(false);
        }
    }
    return (
        <>
        {show &&
        <div
            style={{
                    width: "100%",
                        height: "100",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
            <Spinner animation={style}
                     size={'sm'}
                     variant={'primary'}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>}
        </>)
}
const spinner = new Set();
export {spinner};

