import qs from 'qs';
import {http,api,httpService} from '@/common/http/http.js';

//登录接口
 export const  login=(params={}) =>{
    var qs = require('qs');
    return http.post(api.login,qs.stringify(params),{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(function(response){
            return response;
    });
} 
//获取手机验证码
 export const  getMobileVerifyCode=(params={}) =>{
    var qs = require('qs');
    return http.post(api.getMobileVerifyCode,qs.stringify(params),{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(function(response){
            return response;
    });
} 

//注册接口
export const  register=(params={}) =>{
    var qs = require('qs');
    return http.post(api.register,qs.stringify(params),{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(function(response){
            return response;
    });
} 
//找回密码
export const  changePsw=(params={}) =>{
    var qs = require('qs');
    return http.post(api.changePsw ,qs.stringify(params),{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(function(response){
            return response;
    });
} 
