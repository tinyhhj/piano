import fetch from "./FetchWrapper";

async function getReservations (host, cb =() => {}) {
    const url = new URL('/api/v1/students/reservations',host);
    const reservations = await fetch(url, {credentials : 'include'}).then(res=>res.json());
    cb(reservations);
    return reservations;
}

export default { getReservations};