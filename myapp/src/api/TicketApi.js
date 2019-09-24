async function getTickets(host, cb =()=>{}) {
    const url = new URL('/api/v1/tickets', host);
    const response = await fetch(url).then(res=>res.json());
    cb(response.content);
    return response.content;
}
async function addTicket(host,{studentId,startDate},cb = ()=>{}) {
    const url = new URL(`/api/v1/students/${studentId}/tickets`, host);
    const response = await fetch(url, {method: 'post',body:encodeURIComponent(`start=${startDate}`)}).then(res=>res.json());
    cb(response.content);
    return response.content;
}

export default { getTickets, addTicket};