import qs from 'qs';
import {http,api,httpService} from '@/common/http/http.js';


export const  leafletGet =(params={}) =>{
	
    return http.post(api.leafletGet,qs.stringify(params),{
      headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
      }})		
} 



export const  commentByleaflet =(params={}) =>{
	
    return http.post(api.commentByleaflet,qs.stringify(params),{
      headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
      }})		
} 








// export const cardGet = (params = {}) => {
//     return http.post(api.cardGet, params);
//   }


