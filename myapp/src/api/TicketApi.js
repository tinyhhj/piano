import fetch from "./FetchWrapper";

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
    return response.content;
}
async function addTicket(host,{studentId,startDate,name},cb = ()=>{}) {
    const url = new URL(`/api/v1/students/${studentId}/tickets`, host);
    url.searchParams.append('start', startDate);
    url.searchParams.append('name',name);
    const response = await fetch(url, {method: 'post'}).then(res=>res.json());
    cb(response.content);
    return response.content;
}
async function updateTicket(host,{studentId, ticketId,name, startDate, endDate}, cb=()=>{}) {
    const url = new URL(`/api/v1/students/${studentId}/tickets/${ticketId}`, host);
    url.searchParams.append('start', startDate);
    url.searchParams.append('end',endDate);
    url.searchParams.append('name',name);

    const response = await fetch(url, {method: 'put'}).then(res=>res.json());
    cb(response.content);
    return response.content;
}

export default { getTickets, addTicket, updateTicket, getAllTickets};