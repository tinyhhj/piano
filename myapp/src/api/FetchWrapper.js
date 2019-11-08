import {toast} from '../components/Toast';
export default function FetchWrapper(url , option) {
    const defaultOption = {
        method: 'GET',
        'Content-Type': 'application/json',
        credentials: 'include',
        contextpath: '/piano',
        ...option
    };
    const newUrl = new URL(defaultOption.contextpath + url.pathname+ url.search, url.origin);

    // add();
    return fetch(newUrl, defaultOption)
        .catch(e=>{
            console.log(`error handler: ${newUrl} ,error: ${e}`);
            // toast.forEach(t=>t.show('warning',e))
            throw e;
        })
        .finally(()=> {
            // remove();
        })

};

