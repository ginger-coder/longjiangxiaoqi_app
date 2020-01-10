import instance from './instance';

// 登录
const loginReuest = (params) => instance.post('/api/admin/account/login', { ...params });
//图形验证码
const getCode = (params) => instance.get('/api/admin/account/VerifyCode', { ...params });
//注册
const register = (params) => instance.post('/api/admin/account/PersonResiter', { ...params });
//发送短信验证码
const sendCode = (params) => instance.post('/api/admin/send/Send_RegisterCodeSMS', { ...params });
//修改密码
const findPwd = (params) => instance.post('/api/admin/account/UpdatePasswordByPhoneCode', { ...params });
//修改密码
const sendFindCode = (params) => instance.post('/api/admin/send/Send_PasswordCodeSMS', { ...params });

// /api/admin/account/UpdatePasswordByPhoneCode
// Phone
// Code
// Password
// Repassword

export default {
    loginReuest,
    getCode,
    register,
    sendCode,
    findPwd,
    sendFindCode,
}