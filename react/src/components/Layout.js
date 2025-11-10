import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout as AntLayout, Menu, Button, message } from 'antd';
import { HomeOutlined, UserOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { logout as logoutApi } from '../api/auth';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutApi();
      logout();
      message.success('Вы успешно вышли из системы');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      logout();
      navigate('/');
    }
  };

  const menuItems = isAuthenticated
    ? [
        {
          key: '/',
          icon: <HomeOutlined />,
          label: <Link to="/">Главная</Link>,
        },
        {
          key: '/profile',
          icon: <UserOutlined />,
          label: <Link to="/profile">Профиль</Link>,
        },
      ]
    : [
        {
          key: '/',
          icon: <HomeOutlined />,
          label: <Link to="/">Главная</Link>,
        },
        {
          key: '/login',
          icon: <LoginOutlined />,
          label: <Link to="/login">Вход</Link>,
        },
        {
          key: '/register',
          icon: <UserAddOutlined />,
          label: <Link to="/register">Регистрация</Link>,
        },
      ];

  const selectedKey = location.pathname;

  return (
    <AntLayout data-easytag="id1-react/src/components/Layout.js" className="min-h-screen">
      <Header data-easytag="id2-react/src/components/Layout.js" className="flex items-center justify-between">
        <div data-easytag="id3-react/src/components/Layout.js" className="flex items-center">
          <Menu
            data-easytag="id4-react/src/components/Layout.js"
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={menuItems}
            className="flex-1 min-w-0"
          />
        </div>
        {isAuthenticated && (
          <Button
            data-easytag="id5-react/src/components/Layout.js"
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="text-white"
          >
            Выйти
          </Button>
        )}
      </Header>
      <Content data-easytag="id6-react/src/components/Layout.js" className="p-6">
        <div data-easytag="id7-react/src/components/Layout.js" className="max-w-7xl mx-auto">
          {children}
        </div>
      </Content>
      <Footer data-easytag="id8-react/src/components/Layout.js" className="text-center">
        Приложение с аутентификацией ©{new Date().getFullYear()}
      </Footer>
    </AntLayout>
  );
};

export default Layout;
