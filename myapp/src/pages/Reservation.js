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
    const today = new Date().atStartOfDay();
    const day = 24 * 60 * 60 * 1000;
    const logger = CommonUtil.log;
    const thisWeeks = [...Array(7)].map((v,i)=>CommonUtil.addDay(today,i));
    const weekNames = ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'];

    const renderReservations = reservations =>setReservations(reservations);
    const getReservations = ()=>ReservationApi.getReservations(host, renderReservations);
    const getReservationsInHour = day => reservations
        .find(reservation=> {
            // 시간대에 예약들만 가져옴
            const dateInfo = reservation.reservationTime.split(/[^0-9]/);
            const start =  new Date(dateInfo[0], dateInfo[1]-1, dateInfo[2],dateInfo[3]);
            const end =  CommonUtil.addHour(start, 1);
            // if( start <= hr && hr < end) alert('filtered'.concat(start.toString(), '\n', end.toString(),'\n', hr,'\n' , reservation.reservationTime));
            return start <= day && day < end;
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
                    .map(day=> CommonUtil.addHour(day,hr))
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
                {
                    thisWeeks.map((v,i)=><th key={v}>{`${appendZero(v.getMonth()+1)}-${appendZero(v.getDate())}`}</th>)
                }
            </tr>
            <tr>
            <td></td>
                {
                    thisWeeks.map((v,i)=><th key={i}>{weekNames[v.getDay()]}</th>)
                }
            </tr>
        </thead>
            <tbody onClick={clickHandler} >
            {timetable}
            </tbody>
        </Table>
    );
};
export default Reservations;