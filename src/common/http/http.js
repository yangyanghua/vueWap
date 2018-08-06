import axios from 'axios';
import Vue from 'vue';
import * as api from './api.js';
let httpService = '';
var currentHost = location.host;

/*陈杰 ip 192.168.9.247:8383*/
if (currentHost == 'localhost:8383') {


  httpService = 'http://tmall.iflashbuy.com:8383'; //新接口测试地址
  

} else if ((currentHost == 'tmsh-m.z-code.cn:8383')||(currentHost == 'tmsh-m.z-code.cn:8383')) {

  httpService = 'http://tmall.iflashbuy.com:8383'; 
  
  
} else if (currentHost == 'm.z-code.cn') {
  httpService = 'http://website-api.z-code.cn'; //生產
}

//const getKey = () => {
//return JSON.parse(sessionStorage.getItem('user'));
//};

let http = axios.create({
  baseURL: httpService,
  /*data: {
     token: JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).token : ''
  }*/
});
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';
http.interceptors.request.use(function (config) {

  let params = {};
  config.params = Object.assign(config.params || {}, params);
  return config;
});
http.interceptors.response.use(function (response) {

  let data = response.data || {};
  if(data.code){
	  if (data.code == '0') {
	    console.log("请求成功：" + data.message);
	    return response.data;
	  }
	  let tipMessage = {
	    code: data.code,
	    message: data.message
	  }
	  return Promise.reject(tipMessage);	  

  }else{
  	 return data;
  }

},function (error) {
  let tipMessage = {
    code: '-1',
    message: '网络或系统错误'
  }
  return Promise.reject(tipMessage);
});
export default http;

export {
  api,
  http,
  httpService,
  currentHost
};
