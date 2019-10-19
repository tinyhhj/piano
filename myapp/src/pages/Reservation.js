import React , {useEffect, useState, useContext} from 'react';
import {Table} from "react-bootstrap";
import {Context,Slot, CommonUtil} from '../components';
import {ReservationApi} from "../api";

const Reservations = () => {
    const host = useContext(Context);
    const [reservations, setReservations] = useState([]);
    const appendZero = CommonUtil.appendZero;
    const addDays = CommonUtil.addDay;
    const today = new Date();
    const day = 24 * 60 * 60 * 1000;
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay()? today.getDay(): 7) - 1));
    const sunday = new Date(today)
    sunday.setDate(today.getDate() + (7 - (today.getDay()?today.getDay():7)));

    const renderReservations = reservations =>setReservations(reservations);
    const getReservations = ()=>ReservationApi.getReservations(host, renderReservations);
    const getReservationsInHour = hr => reservations
        .filter(reservation=> {
            // 시간대에 예약들만 가져옴
            const reservationHour = new Date(reservation.reservationTime).getHours();
            const duration = reservation.duration.substr(2,1);
            return reservationHour <= hr && hr < ((reservationHour + Number(duration)) % 24)
        });

    useEffect(()=>{
        getReservations();
    },[]);

    console.log(reservations);

    const oneRow = (time, reservations) => <tr key={time}>
        <th>{`${appendZero(time% 24)}:00-${appendZero((time+1)%24)}:00`}</th>
        {reservations.map(reservation=> reservation? <Slot mine={reservation.mine} reserved={true}></Slot>: <Slot></Slot>)}
    </tr>;
    let hour = 6;
    const getReservationDay = reservation => new Date(reservation.reservationTime).getDay()-1 < 0 ? 6 : new Date(reservation.reservationTime).getDay()-1;
    const timetable = new Array(24)
        .fill(null)
        .map(()=>{
            const hr = (hour++ % 24);
            return oneRow(hr,
                [...Array(7).keys()]
                    .map(day=>getReservationsInHour(hr).find(reservation=>getReservationDay(reservation) === day))
                );
        });


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
            <tbody>
            {timetable}

            </tbody>
        </Table>
    );
};
export default Reservations;