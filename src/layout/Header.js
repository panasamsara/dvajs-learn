import { Layout, Menu, Breadcrumb } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

const { SubMenu } = Menu;
const { Header, } = Layout;

function MyHeader() {
  const urlHash = window.location.hash.replace(/\#/g, '');
  return (
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[urlHash]}>
        <Menu.Item key="/">
            <Link to='/'>首页</Link>
        </Menu.Item>
        <Menu.Item key="/products">
            <Link to='/products'>产品</Link>
        </Menu.Item>
      </Menu>
    </Header>
  </Layout>
)};

export default connect()(MyHeader)