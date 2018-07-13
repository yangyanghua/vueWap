import {http,api,httpService} from '@/common/http/http.js';
import qs from 'qs';

export const getRegion = (params = {}) => {
  return http.get(api.getRegion, {params});
}

export const getAddressList = (params = {}) => {
  return http.get(api.getAddressList, {params});
}

export const deleteAddr = (params = {}) => {
  return http.get(api.deleteAddr, {params});
}


export const addAddr = (params = {}) => {
  return http.post(api.addAddr, params);
}
export const updateAddr = (params = {}) => {
  return http.post(api.updateAddr, params);
}

export const setdefault = (params = {}) => {
  return http.get(api.setdefault, {params});
}
export const getAddbuyId = (params = {}) => {
  return http.get(api.getAddbuyId, {params});
}

export const doSelectAdd = (params = {}) => {
  return http.get(api.doSelectAdd, {params});
}




//export const addAddr = (params = {}) => {
// 	return http.post(api.addAddr,qs.stringify(params),{
//		headers:{
//			'Content-Type':'application/x-www-form-urlencoded'
//		}
//	});
//}