import request from '../../utils/myRequest';  //引入拦截器

export function getArticles() {
  return request('api/getArticles'); //列表
}

export function createArticle(data) {
  return request('api/saveArticle',  {params: data} ); //新增
}

export function updateArticle(data) {
  return request('api/updateArticle',  {params: data} ); //编辑
}
