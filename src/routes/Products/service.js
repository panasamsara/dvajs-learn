import request from '../../utils/request';  //引入拦截器

export function getArticles() {
  return request('api/getArticles', {method: 'POST'}); //接口地址
}
