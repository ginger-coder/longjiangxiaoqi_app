import instance from './instance';

// banner
const bannerList = (params) => instance.get('/api/cms/cmsinfo/querytop', { params });
// 首页广告
const advList = (params) => instance.get('/api/advert/advertinfo/querytop', { params });
// 首页新闻
const newsList = (params) => instance.get('/api/cms/cmsinfo/querytop', { params });
const newsDetail = (params) => instance.get('/api/cms/cmsinfo/edit', { params });
// 区域划分
const zoneList = (params) => instance.get('/api/common/area/QueryByParentCode', { params });

// 区域划分
const zoneList__all = (params) => instance.get('/api/common/area/QueryChildren', { params });

// 首页院校 企业 机构推荐首页院校 企业 机构推荐
const organizationList = (params) => instance.get('/api/personnelfiles/company/querytop', { params });

const orgDetail = (params) => instance.get('/api/personnelfiles/company/edit', { params });

// 机构详情
const jigouDetail = (params) => instance.get('/api/business/Occupation/edit', { params });

// const getCity = () => instance.get('http://pv.sohu.com/cityjson?ie=utf-8')
// 投递职位 报名院校、机构
const baoming = (params) => instance.post('/api/business/Deliver/add', params);


const homeHotJobList = (params) => instance.get('/api/business/deliver/jobfunctioncount', params);


const schoolList = (params) => instance.get('/api/business/RecruitStudents/QueryByPerson', { params });
const schooLDetail = (params) => instance.get('/api/business/RecruitStudents/edit', { params });
const Authentication = (params) => instance.get('/api/admin/Authentication/QueryChildren', { params });
const AuthenticationList = (params) => instance.get('/api/business/Occupation/QueryByPerson', { params });


const hometuijian = (params) => instance.get('/api/business/recruit/querytop', { params });


const collectToggle = (params) => instance.post('/api/business/collect/add', params);


export default {
  bannerList,
  advList,
  newsList,
  zoneList,
  organizationList,
  orgDetail,
  newsDetail,
  baoming,
  jigouDetail,

  schoolList,
  schooLDetail,

  Authentication,
  AuthenticationList,
  zoneList__all,
  homeHotJobList,
  // getCity,

  hometuijian,
  collectToggle
}