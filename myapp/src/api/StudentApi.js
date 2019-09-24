
async function getStudents(host,cb = ()=>{}) {
    const url = new URL('/api/v1/students', host);
    const response = await fetch(url);
    const students = await response.json();
    cb(students.content);
    return students.content;
}

async function deleteStudent(host,id, cb =()=>{}) {
    const url = new URL(`/api/v1/students/${id}`,host);
    await fetch(url, {method:'delete'});
    cb();
}

export default { getStudents, deleteStudent};