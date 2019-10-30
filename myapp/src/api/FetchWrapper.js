import {toast} from '../components/Toast';
export default function FetchWrapper(url , option) {
    const defaultOption = {
        method: 'GET',
        'Content-Type': 'application/json',
        credentials: 'include',
        contextpath: '/piano',
        ...option
    };
    url = new URL(defaultOption.contextpath + url.pathname, url.origin);
    // add();
    return fetch(url, defaultOption)
        .catch(e=>{
            console.log(`error handler: ${url} ,error: ${e}`);
            // toast.forEach(t=>t.show('warning',e))
            throw e;
        })
        .finally(()=> {
            // remove();
        })

};

