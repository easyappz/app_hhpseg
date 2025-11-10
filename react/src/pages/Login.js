import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await loginApi(values.email, values.password);
      
      localStorage.setItem('refresh', data.refresh);
      login(data.user, data.access);
      
      message.success('Вход выполнен успешно!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response && error.response.status === 401) {
        message.error('Неверный email или пароль');
      } else if (error.response && error.response.status === 404) {
        message.error('Профиль пользователя не найден');
      } else if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.error) {
          message.error(errorData.error);
        } else {
          Object.keys(errorData).forEach((key) => {
            const errorMessages = Array.isArray(errorData[key]) ? errorData[key] : [errorData[key]];
            errorMessages.forEach((msg) => {
              message.error(`${key}: ${msg}`);
            });
          });
        }
      } else {
        message.error('Ошибка входа. Попробуйте еще раз.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Login.js" className="flex justify-center items-center min-h-[80vh]">
      <Card data-easytag="id2-react/src/pages/Login.js" className="w-full max-w-md">
        <Title data-easytag="id3-react/src/pages/Login.js" level={2} className="text-center mb-6">
          Вход
        </Title>
        
        <Form
          data-easytag="id4-react/src/pages/Login.js"
          form={form}
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            data-easytag="id5-react/src/pages/Login.js"
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' },
            ]}
          >
            <Input
              data-easytag="id6-react/src/pages/Login.js"
              prefix={<MailOutlined />}
              placeholder="example@mail.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id7-react/src/pages/Login.js"
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
            ]}
          >
            <Input.Password
              data-easytag="id8-react/src/pages/Login.js"
              prefix={<LockOutlined />}
              placeholder="••••••"
              size="large"
            />
          </Form.Item>

          <Form.Item data-easytag="id9-react/src/pages/Login.js">
            <Button
              data-easytag="id10-react/src/pages/Login.js"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Войти
            </Button>
          </Form.Item>

          <div data-easytag="id11-react/src/pages/Login.js" className="text-center">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
