import React, { useState, } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Button } from 'antd';

function IndexPage({dispatch, indexModel}) {
  function cliFunc(){
    let num = indexModel.number+1;
    dispatch({
      type: 'indexModel/updateState',
      payload: {
        number: num,
      },
    })
  }
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        
      </ul>
      <div>{indexModel.number}</div>
      <Button type="primary" onClick={cliFunc}>number+1</Button>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(({indexModel, loading})=>({
  indexModel, loading
}))(IndexPage);
