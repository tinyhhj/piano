
export default function FetchWrapper(url , option) {
    const defaultOption = {
        method: 'GET',
        'Content-Type': 'application/json',
        ...option
    };
    // add();
    return fetch(url, defaultOption)
        .catch(e=>{
            console.log(`error handler: ${url} ,error: ${e}`);
            throw e;
        })
        .finally(()=> {
            // remove();
        })

};

