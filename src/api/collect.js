import instance from './instance';

// 投递列表
const collectList = (params) => instance.get('/api/business/collect/query',{params});


export default {
  collectList
}