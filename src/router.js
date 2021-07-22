import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import Header from './layout/Header';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div>
        <Header></Header>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/products" exact component={Products} />
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
