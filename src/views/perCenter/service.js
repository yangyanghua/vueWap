import {http,api,httpService} from '@/common/http/http.js';
import qs from 'qs';

//export const getCustomerOrderList = (params = {}) => {
//return http.get(api.getCustomerOrderList, {params});
//}



export const getCustomerOrderList = (params = {}) => {
   	return http.post(api.getCustomerOrderList,qs.stringify(params),{
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}
	});
}