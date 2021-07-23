import { Layout, Menu, Breadcrumb, Table, Tag, Space, Button, Modal, Form, Input,} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import dayjs from 'dayjs';
import React, { useState, } from 'react';
import {
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function IndexPage({dispatch, productsModel, indexModel, loading}) {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => (
        <Space size="middle">
          <a> {dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</a>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>showModal('edit',record)}>编辑</a>
          <a onClick={()=>deleteData(record)}>删除</a>
        </Space>
      ),
    },
  ];

  function getList (){
    dispatch({
      type: 'productsModel/fetch',
      payload: {},
    })
  };
  function deleteData (row){
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确认要删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        dispatch({
          type: 'productsModel/deleteEff',
          payload: {id: row.id},
        })
      }
    });
    
  };

  
  const [form] = Form.useForm();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowData, setRowData] = useState({});
  const [modalFlag, setModalFlag] = useState('add');

  // 打开新增\编辑弹框
  const showModal = (flag, row={}) => {
    if(flag == 'add'){
      form.resetFields();
    }else{
      form.setFieldsValue(row);
    }
    setModalFlag(flag);
    setIsModalVisible(true);
    setRowData(row);
  };
  //保存按钮
  const handleOk = (values) => {
    dispatch({
      type: modalFlag =='add' ? 'productsModel/create':'productsModel/update', 
      payload: {
        ...rowData,
        ...form.getFieldsValue()
      } 
    });
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const formItemLayout ={
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const buttonItemLayout ={
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  };

  return (
    <Layout>

      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>产品</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Button type="primary" onClick={()=>getList()}>查询</Button>
            <Button type="primary" onClick={()=>showModal( 'add')} style={{marginLeft: 10}}>新增</Button>
            <Table 
              columns={columns} 
              dataSource={productsModel.articles} 
              rowKey="id"
              loading={loading}
            />

            <div>{indexModel.number}</div>
            
            <Modal title="文章" 
              width={800}
              visible={isModalVisible} 
              onOk={handleOk} 
              onCancel={handleCancel}
            >
              <Form
                {...formItemLayout}
                layout={"horizontal"}
                form={form}
                onFinish={handleOk}
              >
                <Form.Item label="标题" name="title">
                  <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item label="内容" name="content">
                  <Input placeholder="input placeholder" />
                </Form.Item>

              </Form>  
            </Modal>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
};
function mapStateToProps(state) {
  return state.indexModel;
}
 
function mapDispatchToProps(dispatch) {
  return {
    fetch(count){
      dispatch({type: 'indexModel/fetch', count});
    }
  }
}
export default connect(({productsModel, indexModel, loading})=>({
  productsModel, indexModel, loading, 
}))(IndexPage)