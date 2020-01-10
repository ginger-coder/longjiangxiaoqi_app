import instance, { serverUrl } from './instance';

export const uploadPhoto = serverUrl + '/api/cms/cmsinfo/uploadpicture';

export const uploadJianli = serverUrl + '/api/business/personcandidate/UploadCandidate';

///api/personalcenter/personcandidate/candidateadd
// 基本信息添加与修改
const baseInfo = (params) => instance.post('/api/business/personcandidate/candidateadd', { ...params });
// 基本信息添加与修改
const getBaseInfo = (params) => instance.get('/api/business/personcandidate/info');

// 工作经历
const workList = (params) => instance.get('/api/business/personcandidatework/querylistbycandidateid', { params });

// 工作经历添加
const workAdd = (params) => instance.post('/api/business/personcandidatework/add', { ...params });

// 工作经历修改
const workEdit = (params) => instance.post('/api/business/personcandidatework/edit', { ...params });

// 工作经历删除
const workDelete = (params) => instance.delete('/api/business/personcandidatework/delete', { params });

// 项目经历编辑
const projectEdit = (params) => instance.post('/api/business/personcandidateproject/add', { ...params });

// 项目经历列表
const projectList = (params) => instance.get('/api/business/personcandidateproject/QueryListByCandidateID', { params });
// 项目经历删除
const projectDelete = (params) => instance.delete('/api/business/personcandidateproject/delete', { params });

// 教育列表
const studyList = (params) => instance.get('/api/business/personcandidateedu/QueryListByCandidateID', { params });
// 教育经历编辑
const studyEdit = (params) => instance.post('/api/business/personcandidateedu/candidateeduadd', { ...params });
// 教育经历删除
const studyDelete = (params) => instance.delete('/api/business/personcandidateedu/delete', { params });

// 投递列表
const getTouDiList = (params) => instance.get('/api/business/Sign/QueryByPerson', { params });



export default {
    baseInfo,
    getBaseInfo,
    workEdit,
    workAdd,
    workDelete,
    workList,
    projectEdit,
    projectList,
    projectDelete,
    studyList,
    studyEdit,
    studyDelete,
    getTouDiList,
}