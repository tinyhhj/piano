import React , {useEffect, useState, useContext} from 'react';
import {Table} from "react-bootstrap";
import {Slot} from '../components';

const Reservations = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay()? today.getDay(): 7) - 1));
    const sunday = new Date(today)
    sunday.setDate(today.getDate() + (7 - (today.getDay()?today.getDay():7)));

    const oneRow = <tr>
        <th></th>
        <Slot reserved={true} mine ={true}></Slot>
        <Slot reserved={true} mine ={false}></Slot>
        <Slot reserved={false} mine ={true}></Slot>
        <Slot reserved={false} mine ={false}></Slot>
        <Slot></Slot>
        <Slot></Slot>
        <Slot></Slot>
    </tr>;
    const timetable = new Array(48)
        .fill(oneRow);
    console.log(today, monday, sunday);


    return (
        <Table striped bordered hover >
            <thead>
            <tr>
            <td></td>
            <th>월요일</th>
            <th>화요일</th>
            <th>수요일</th>
            <th>목요일</th>
            <th>금요일</th>
            <th>토요일</th>
            <th>일요일</th>
            </tr>
        </thead>
            <tbody>
            {timetable}

            </tbody>
        </Table>
    );
};
export default Reservations;