import instance from './instance';

// 投递列表
const deliveryList = (params) => instance.get('/api/business/Sign/QueryByPerson',{params});


export default {
  deliveryList
}