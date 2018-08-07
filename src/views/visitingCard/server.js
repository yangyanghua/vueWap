import qs from 'qs';
import {http,api,httpService} from '@/common/http/http.js';

export const  cardGet=(params={}) =>{
	
    return http.post(api.cardGet,qs.stringify(params),{
      headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
      }})		
} 





// export const cardGet = (params = {}) => {
//     return http.post(api.cardGet, params);
//   }


