import { Layout, Menu, Breadcrumb, Table, Tag, Space, Button, } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import dayjs from 'dayjs';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

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
    // key: 'createdAt',
    render: (text, record) => (
      <Space size="middle">
        <a> {dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</a>
      </Space>
    ),
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: tags => (
  //     <>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

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
  function handleClick (){
    dispatch({
      type: 'productsModel/fetch',
      payload: {},
    })
  };
  
  return (
    <Layout>

      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Button type="primary" onClick={()=>handleClick()}>查询</Button>
            <Table 
              columns={columns} 
              dataSource={productsModel.articles} 
              rowKey="id"
              loading={loading}/>
            <div>{indexModel.number}</div>
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