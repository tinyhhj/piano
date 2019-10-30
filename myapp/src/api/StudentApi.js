import fetch from "./FetchWrapper";

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

async function whoami(host, cb=()=>{}) {
    const url = new URL('/api/v1/students/me', host);
    const response = await fetch(url).then(res=>res.json());
    cb(response);
    return response;
}

async function updateStudent(host, {id,name}, cb=()=>{}) {
    var url = new URL(`/api/v1/students/${id}`, host);
    url.searchParams.append('name', name);
    await fetch(url, {method:'put'}).then(res=>res.json());
    cb();
}

async function getStudent(host,id, cb=()=>{}) {
    var url = new URL(`/api/v1/students/${id}`, host);
    const student = await fetch(url).then(res=>res.json());
    cb(student);
    return student;
    // setlogin(login);
}

async function addStudent( host, {name,login}, cb=()=>{}) {
    var url = new URL('/api/v1/students', host),
        params = {name: name, login: login};
    Object.keys(params).forEach(k => url.searchParams.append(k,params[k]))
    const response = await fetch(url, {method: 'post'})
        .then(res=>res.json());
    cb(response);
    return response;
}

export default { getStudents, deleteStudent, whoami, updateStudent,getStudent,addStudent};