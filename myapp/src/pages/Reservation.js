import React , {useEffect, useState, useContext} from 'react';
import {Table} from "react-bootstrap";
import {Context,Slot, CommonUtil} from '../components';
import {ReservationApi, StudentApi} from "../api";

const Reservations = () => {
    const host = useContext(Context);
    const [reservations, setReservations] = useState([]);
    const [ student, setStudent] = useState({});
    const appendZero = CommonUtil.appendZero;
    const addDays = CommonUtil.addDay;
    const today = new Date();
    const day = 24 * 60 * 60 * 1000;
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay()? today.getDay(): 7) - 1));
    const sunday = new Date(today);
    sunday.setDate(today.getDate() + (7 - (today.getDay()?today.getDay():7)));
    const logger = CommonUtil.log;
    const thisWeeks = [...Array(7)].map((v,i)=>CommonUtil.addDay(monday.atStartOfDay(),i));

    const renderReservations = reservations =>setReservations(reservations);
    const getReservations = ()=>ReservationApi.getReservations(host, renderReservations);
    const getReservationsInHour = hr => reservations
        .find(reservation=> {
            // 시간대에 예약들만 가져옴
            const dateInfo = reservation.reservationTime.split(/[^0-9]/);
            const start =  new Date(dateInfo[0], dateInfo[1]-1, dateInfo[2],dateInfo[3]);
            const end =  CommonUtil.addHour(start, 1);
            // if( start <= hr && hr < end) alert('filtered'.concat(start.toString(), '\n', end.toString(),'\n', hr,'\n' , reservation.reservationTime));
            return start <= hr && hr < end;
        });

    useEffect(()=>{
        StudentApi.whoami(host, setStudent);
        getReservations();
    },[]);

    logger.debug(reservations);

    const oneRow = (time, reservations) => <tr key={time}>
        <th>{`${appendZero(time% 24)}:00-${appendZero((time+1)%24)}:00`}</th>
        {reservations.map((reservation,day)=> reservation? <Slot data-reservation ={reservation.id} data-key={`${day}:${time}`} key={day} mine={reservation.mine} reserved={true}></Slot>: <Slot data-key={`${day}:${time}`} key={day}></Slot>)}
    </tr>;
    let hour = 6;
    const getReservationDay = reservation => new Date(reservation.reservationTime).getDay()-1 < 0 ? 6 : new Date(reservation.reservationTime).getDay()-1;
    const timetable = new Array(24)
        .fill(null)
        .map(()=>{
            const hr = hour++;
            return oneRow(hr,
                [...thisWeeks]
                    .map(day=> CommonUtil.addHour(day.atStartOfDay(),hr))
                    .map(day=>getReservationsInHour(day)));
        });
    const convertReservationTime = datetime => {
        const now = new Date();
        const day = datetime.split(':')[0];
        const time = datetime.split(':')[1];

        return CommonUtil.toISOString(CommonUtil.addHour(thisWeeks[day],time));
    };

    const makeReservation = datetime => {
        ReservationApi.addReservation(host, {studentId: student.id, reservationTime: datetime},getReservations);
    }

    const clickHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        if( e.target.dataset.reservation) {
            ReservationApi.deleteReservation(host, {studentId: student.id, reservationId: e.target.dataset.reservation}, getReservations)
            return;
        }
        [convertReservationTime, makeReservation].reduce((acc, cur)=> {
            const res = acc ? cur(acc): acc;
            return res;
        }, e.target.dataset.key)
    }



    return (
        <Table striped bordered hover >
            <thead>
            <tr>
                <td></td>
                {new Array(7).fill('').map((v,i)=>{
                    const from = addDays(monday,i);
                return <th key={from}>{`${appendZero(from.getMonth()+1)}-${appendZero(from.getDate())}`}</th>
                })}
            </tr>
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
            <tbody onClick={clickHandler} >
            {timetable}
            </tbody>
        </Table>
    );
};
export default Reservations;