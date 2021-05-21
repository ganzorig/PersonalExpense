import React, { useState } from 'react';
import { Layout, Menu, PageHeader } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider, Content, Footer } = Layout;

export default function LayoutPages({ children, topContent, title }) {
  const [collapsed, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapsed);
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
        <div className="logo">PersonalExpense</div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/transactions">Transactions</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/category">Categories</Link>
          </Menu.Item>

          <Menu.Item key="3" icon={<PieChartOutlined />}>
            <Link>Reports</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="login">Login</Link>
          </Menu.Item>

          <Menu.Item onClick={logout} key="5" icon={<LogoutOutlined />}>
            <Link to="login">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={title}
          extra={topContent}
        ></PageHeader>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ margin: '16px 0' }}></div>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: '100%' }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ComPro CS401-2021-05B-06A ©2021 Created by Team 1
        </Footer>
      </Layout>
    </Layout>
  );
}
