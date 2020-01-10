
import instance from './instance';
// banner
const joblist = (params) => instance.get('/api/admin/jobfunction/querychildren',{params});
const professlist = (params) => instance.get('/api/admin/profession/querychildren',{params});
const positionList = (params) => instance.get('/api/business/recruit/QueryByPerson',{params});
const positionInfo = (params) => instance.get('/api/business/recruit/edit',{params});
const positionADD = (params) => instance.post('/api/business/Deliver/add',{...params});

// 企业列表
const companyList = (params) => instance.get('/api/personnelfiles/company/query',{params});

export default {
    joblist,
    professlist,
    positionList,
    positionInfo,
    positionADD,
    companyList
}