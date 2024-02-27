"use client"
import React, { useState } from 'react';

import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import CommonHeader from './component/header';
import Classes from './component/classes';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getMenuItem('好苗子初级中学', '1', null , [
    getMenuItem('一年级', '1-1', null , [
      getMenuItem('一班', '1-1-1'),
      getMenuItem('二班', '1-1-2'),
    ]),
    getMenuItem('二年级', '1-2', null , [
      getMenuItem('一班', '1-2-1'),
      getMenuItem('二班', '1-2-2'),
    ])
  ]),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="h-[100px]" >LOGO</div>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['1-1-1']} 
          defaultOpenKeys={['1', '1-1', '1-2']} 
          mode="inline" 
          items={items} 
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* <12 */}
          <CommonHeader />
        </Header>
        <Content style={{ margin: '16px 16px' }}>
          <div className='h-full bg-white p-6 rounded-md overflow-hidden'>
            <Classes />
          </div>
          {/* <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;