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
        console.log(123, code, data)
        if(code){
          yield put({ type: 'save' , payload: data});
        } 
      } catch (e) {
        message.error(e.message);
      }
    },
  },

  reducers: {
    save(state, action) {
      console.log(222, action)
      return { ...state, articles: action.payload };
    },
  },

};
