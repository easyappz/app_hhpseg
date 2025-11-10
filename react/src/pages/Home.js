import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Button, Space } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const { Title, Paragraph } = Typography;

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div data-easytag="id1-react/src/pages/Home.js" className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-2xl">
        <div data-easytag="id2-react/src/pages/Home.js" className="text-center">
          <Title data-easytag="id3-react/src/pages/Home.js" level={1}>
            Добро пожаловать!
          </Title>
          
          {isAuthenticated ? (
            <div data-easytag="id4-react/src/pages/Home.js">
              <Paragraph data-easytag="id5-react/src/pages/Home.js" className="text-lg">
                Здравствуйте, {user?.first_name} {user?.last_name}!
              </Paragraph>
              <Paragraph data-easytag="id6-react/src/pages/Home.js">
                Вы успешно авторизованы в системе.
              </Paragraph>
              <Space data-easytag="id7-react/src/pages/Home.js" className="mt-4">
                <Link to="/profile">
                  <Button data-easytag="id8-react/src/pages/Home.js" type="primary" size="large">
                    Мой профиль
                  </Button>
                </Link>
              </Space>
            </div>
          ) : (
            <div data-easytag="id9-react/src/pages/Home.js">
              <Paragraph data-easytag="id10-react/src/pages/Home.js" className="text-lg">
                Это главная страница приложения.
              </Paragraph>
              <Paragraph data-easytag="id11-react/src/pages/Home.js">
                Пожалуйста, войдите в систему или зарегистрируйтесь, чтобы продолжить.
              </Paragraph>
              <Space data-easytag="id12-react/src/pages/Home.js" className="mt-4">
                <Link to="/login">
                  <Button data-easytag="id13-react/src/pages/Home.js" type="primary" size="large">
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button data-easytag="id14-react/src/pages/Home.js" size="large">
                    Регистрация
                  </Button>
                </Link>
              </Space>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Home;
