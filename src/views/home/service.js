import qs from 'qs';
import {http,api,httpService} from '@/common/http/http.js';


 export const  getNewsdata=(params={}) =>{
 	var qs = require('qs');
    return http.post(api.getNews,qs.stringify(params),{
                      headers:{
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }})		
		.then(function(response){
			return response;
		});
		} 
 export const  getNewsdetail=(params={}) =>{
 	var qs = require('qs');
    return http.post(api.getNewsDetail,qs.stringify(params),{
                      headers:{
                            'Content-Type': 'application/x-www-form-urlencoded'
                      }})		
		.then(function(response){
			return response;
		});
		} 		