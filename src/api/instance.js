import axios from 'axios';
export const serverUrl = 'http://47.93.199.16:5220';
let domain = process.env.NODE_ENV === 'development' ? '/' : serverUrl;

let instance = axios.create({
  baseURL: domain,
  // timeout: 50000,
});

// let accessToken = localStorage.getItem('accessToken');
// if (accessToken != null && accessToken != 'null') {
//   instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
// }


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
    let token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  return response.data;
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        localStorage.clear();
        location.href = '#/login';
    }
  }
  return Promise.reject(error);
});

export default instance;
