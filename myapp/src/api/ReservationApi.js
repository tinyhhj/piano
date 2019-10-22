import fetch from "./FetchWrapper";

async function getReservations (host, cb =() => {}) {
    const url = new URL('/api/v1/students/reservations',host);
    const reservations = await fetch(url).then(res=>res.json());
    cb(reservations);
    return reservations;
}

async function addReservation (host, {studentId, reservationTime, memo}, cb =()=>{}) {
    const url = new URL('/api/v1/students/{}/reservations'.replace('{}',studentId),host);
    url.searchParams.append('reservationTime', reservationTime)
    if(memo) url.searchParams.append('memo', memo);
    const reservation = await fetch(url, {method: 'post'}).then(res=>res.json());
    cb(reservation);
    return reservation;
}

async function deleteReservation (host,{studentId, reservationId}, cb=()=>{}) {
    const url = new URL('/api/v1/students/{}/reservations/{}'
        .replace('{}',studentId).replace('{}',reservationId),host);
    await fetch(url,{method:'delete'});
    cb();
}

export default { getReservations, addReservation, deleteReservation};