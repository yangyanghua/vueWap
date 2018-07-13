import qs from 'qs';
import {http,api,httpService} from '@/common/http/http.js';

export const  getOrderData=(params={}) =>{
    var qs = require('qs');
    return http.post(api.msettleOrder,qs.stringify(params),{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(function(response){
        return response;
    });
}

export const  regOrder=(params={}) =>{
    var qs = require('qs');
    return http.post(api.regOrder,qs.stringify(params),{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(function(response){
        return response;
    });
}
