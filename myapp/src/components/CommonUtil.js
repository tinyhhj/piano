
function getDate(date) {
    // date getYear 버전에 따라 2021 형식 혹은 현재 - 1900 차이 년수가 리턴
    let year  =''+date.getYear();
    let month = appendZero(date.getMonth()+1);
    if( year.length !== 4) {
        year = 1900 + Number(year);
    }
    return ''.concat(year,'-',month,'-',date.getDate());
}

function appendZero(number) {
    const num = ''+number;
    if( num.length < 2 ) {
        return '0'+number;
    }
     return number;
}



const log = ((level = 'debug')=> {
    const logLevel = {
        debug: 0,
        info:1,
        error:2
    };

    return {
        debug: (...msg)=> logLevel[level] <= logLevel['debug'] ? console.log.apply(console, msg): null,
        info: msg=> logLevel[level] <= logLevel['info'] ? console.log.apply(console, msg): null,
        error: msg=> logLevel[level] <= logLevel['error'] ? console.log.apply(console, msg): null,
    }
})();

function addDay(date, days) {
    const from = new Date(date);
    from.setDate(from.getDate() + days);
    return from;
}

function addHour(date, hours) {
    const from = new Date(date);
    from.setHours(from.getHours() + hours);
    return from;
}

export default {log, getDate, appendZero, addDay};

