import axios from 'axios';
import Vue from 'vue';
import * as api from './api.js';
let httpService = '';
var currentHost = location.host;







if (currentHost == 'localhost:8383') {


  httpService = 'http://outmao.com:8088'; 
  

} else if (currentHost == '') {

  httpService = 'http://outmao.com:8088'; 
  
  
} else {
  httpService = 'http://outmao.com:8088'; 
}

//const getKey = () => {
//return JSON.parse(sessionStorage.getItem('user'));
//};

let http = axios.create({
  baseURL: '',
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
	  if (data.status == '0') {
	    console.log("请求成功：" + data.message);
	    return response.data.data;
	  }
	  let tipMessage = {
	    code: data.code,
	    message: data.message
	  }
	  return Promise.reject(tipMessage);	  

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
