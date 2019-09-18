import axios from 'axios';
import {spinner as Spinner} from './Spinner';
import {toast as Toast} from './Toast';

export default class AjaxUtils {
    // for some reason need fix
    // additional patch
    static _get(url, query , props={}) {
        return axios({
            method: 'get',
            url : url+(Object.keys(query).length ? AjaxUtils.qs(query) : "")
        });
    }

    static get(url , data={} , props ={}) {
        const defaultProps = {
            errorHandling : true,
        };
        const property = {...defaultProps ,...props};
        const {message} = props;


        const id = Spinner.forEach(e=>e.show())

        if(property.errorHandling) {
            return AjaxUtils._get(url,data,property).catch(err => {
            Spinner.forEach(e=>e.hide(id));
            AjaxUtils.errorHandler(err)}).then(res=>{Spinner.forEach(e=>e.hide(id));
                                                        if( message ) Toast.forEach(t=>t.show('success' , message));
                                                        return res;});
        } else {
            return AjaxUtils._get(url,data,property).then(res=>{Spinner.forEach(e=>e.hide(id));
                                                                if( message ) Toast.forEach(t=>t.show('success' , message));
                                                                return res;});
        }
    }

    static post(url , data={} , props={}) {
        const id = Spinner.forEach(e=>e.show())
        const {message , formData } = props;
        if( formData ) {
            // const body = new FormData();
            // for ( var k in data ) {
            //     body.set(k , data[k]);
            // }
            // data = body;
            data = AjaxUtils.qs(data).slice(1);
        }
        return axios({
            method: 'post',
            url: url,
            data: data
        }).catch(err => {
            Spinner.forEach(e=>e.hide(id));
            AjaxUtils.errorHandler(err)})
            .then(res=>{Spinner.forEach(e=>e.hide(id));
                        if( message ) Toast.forEach(t=>t.show('success' , message));
                        return res;});
    }

    static delete(url , data={} , props={}) {
        const id = Spinner.forEach(e=>e.show())
        const {message} = props;
        return axios({
            method: 'delete',
            url : url,
            data : data,
        }).catch(err => {
            Spinner.forEach(e=>e.hide(id));
            AjaxUtils.errorHandler(err)})
            .then(res=>{Spinner.forEach(e=>e.hide(id));
                        if( message ) Toast.forEach(t=>t.show('success' , message));
                        return res;});
    }
    static put(url , data={} , props ={}) {
        const id = Spinner.forEach(e=>e.show())
        const {message} = props;
        return axios({
            method: 'put',
            url : url,
            data : data,
        }).catch(err => {
            Spinner.forEach(e=>e.hide(id));
            AjaxUtils.errorHandler(err)})
            .then(res=>{Spinner.forEach(e=>e.hide(id));
                        if( message ) Toast.forEach(t=>t.show('success' , message));
                        return res;});
    }
    static errorHandler(err) {
        console.log('Error occuered! : ' + err);
        Toast.forEach(t=>t.show('warning' , ''+err));
        throw {result : "fail" , message:"request failed!"};
    }

    static qs(query) {
        return "?" + Object.keys(query).map(key=>"&"+key+"="+query[key]).join("").replace(/&/,"")
    }

    static all(...requests) {
        return axios.all(requests).catch(err => {
            AjaxUtils.errorHandler(err)});
    }
}