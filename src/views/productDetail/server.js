import qs from 'qs';
import {http,api,httpService} from '@/common/http/http.js';

export const  deltailPro=(params={}) =>{
 	var qs = require('qs');
    return http.post(api.deltailPro,qs.stringify(params),{
      headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
      }})		
	// .then(function(response){
	// 	return response;
	// });
} 

// export const deltailPro = (params = {}) => {
//     return http.post(api.deltailPro, params);
//   }


export const  deltailSku=(params={}) =>{
 	var qs = require('qs');
    return http.get(api.deltailSku, { params })
    // .then(function(response){
    // 	return response;
    // });
} 

export const  deltailPurchase=(params={}) =>{
  var qs = require('qs');
    return http.get(api.purchase, { params })
    // .then(function(response){
    //  return response;
    // });
} 

export const  chectProduct=(params={}) =>{
  var qs = require('qs');
    return http.get(api.chectProduct, { params })
    // .then(function(response){
    //  return response;
    // });
} 

