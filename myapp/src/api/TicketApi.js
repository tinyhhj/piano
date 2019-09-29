async function getAllTickets(host, cb =()=>{}) {
    const url = new URL('/api/v1/tickets', host);
    const response = await fetch(url).then(res=>res.json());
    cb(response.content);
    return response.content;
}

async function getTickets(host, {studentId}, cb=()=>{}) {
    const url = new URL(`/api/v1/students/${studentId}/tickets`,host);
    const response = await fetch(url).then(res=>res.json());
    cb(response.content);
    return response.content;}
async function addTicket(host,{studentId,startDate},cb = ()=>{}) {
    const url = new URL(`/api/v1/students/${studentId}/tickets`, host);
    const response = await fetch(url, {method: 'post',
        body:`start=${encodeURIComponent(startDate)}`,
        headers: {'content-type' : 'application/x-www-form-urlencoded'}
    }).then(res=>res.json());
    cb(response.content);
    return response.content;
}
async function updateTicket(host,{studentId, ticketId, startDate, endDate}, cb=()=>{}) {
    const url = new URL(`/api/v1/students/${studentId}/tickets/${ticketId}`, host);
    url.searchParams.append('start', startDate);
    url.searchParams.append('end',endDate);

    const response = await fetch(url, {method: 'put'}).then(res=>res.json());
    cb(response.content);
    return response.content;
}

export default { getTickets, addTicket, updateTicket, getAllTickets};