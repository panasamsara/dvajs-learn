import request from '../../utils/myRequest';  //引入拦截器

export function getArticles() {
  return request('api/getArticles'); //接口地址
}

export function updateArticle(data) {
  return request('api/updateArticle',  {params: data} ); //接口地址
}