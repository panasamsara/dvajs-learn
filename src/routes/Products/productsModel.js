import * as Service from './service';
import {message} from 'antd';

export default {

  namespace: 'productsModel',

  state: {
    articles: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/products') {
          dispatch({
            type: 'productsModel/fetch',
          });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      try {
        const {code, data} = yield call(Service.getArticles, payload);  //调用接口
        if(code){
          yield put({ type: 'save' , payload: data});
        } 
      } catch (e) {
        message.error(e.message);
      }
    },
    *create({ payload }, { call, put }) {  // eslint-disable-line
      try {
        const {code, data} = yield call(Service.createArticle, payload);  //调用接口
      } catch (e) {
        message.error(e.message);
      }
    },
    *update({ payload }, { call, put }) {  // eslint-disable-line
      try {
        const {code, data} = yield call(Service.updateArticle, payload);  //调用接口
      } catch (e) {
        message.error(e.message);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, articles: action.payload };
    },
  },

};
