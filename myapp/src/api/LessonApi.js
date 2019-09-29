async function getLessons(host, ticketId, cb = ()=>{}) {
    const url = new URL(`/api/v1/tickets/${ticketId}/lessons`, host);
    const response = await fetch(url).then(res=>res.json());
    cb(response.content);
    return response.content;
}

async function addLesson(host, {ticketId, lessonDate, memo },cb=()=>{}) {
    const url = new URL(`/api/v1/tickets/${ticketId}/lessons`, host);
    if(memo) url.searchParams.append('memo', memo);
    if(lessonDate) url.searchParams.append('lessonDate',lessonDate);
    const response = await fetch(url, {method: 'post'}).then(res=>res.json());
    cb(response.content);
    return response.content;
}



export default { getLessons, addLesson};