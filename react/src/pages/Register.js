import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { register } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await register(
        values.email,
        values.firstName,
        values.lastName,
        values.password,
        values.passwordConfirm
      );
      
      localStorage.setItem('refresh', data.refresh);
      login(data.user, data.access);
      
      message.success('Регистрация прошла успешно!');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((key) => {
          const errorMessages = Array.isArray(errors[key]) ? errors[key] : [errors[key]];
          errorMessages.forEach((msg) => {
            message.error(`${key}: ${msg}`);
          });
        });
      } else {
        message.error('Ошибка регистрации. Попробуйте еще раз.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Register.js" className="flex justify-center items-center min-h-[80vh]">
      <Card data-easytag="id2-react/src/pages/Register.js" className="w-full max-w-md">
        <Title data-easytag="id3-react/src/pages/Register.js" level={2} className="text-center mb-6">
          Регистрация
        </Title>
        
        <Form
          data-easytag="id4-react/src/pages/Register.js"
          form={form}
          name="register"
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            data-easytag="id5-react/src/pages/Register.js"
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' },
            ]}
          >
            <Input
              data-easytag="id6-react/src/pages/Register.js"
              prefix={<MailOutlined />}
              placeholder="example@mail.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id7-react/src/pages/Register.js"
            label="Имя"
            name="firstName"
            rules={[
              { required: true, message: 'Пожалуйста, введите имя!' },
              { min: 2, message: 'Имя должно содержать минимум 2 символа!' },
            ]}
          >
            <Input
              data-easytag="id8-react/src/pages/Register.js"
              prefix={<UserOutlined />}
              placeholder="Иван"
              size="large"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id9-react/src/pages/Register.js"
            label="Фамилия"
            name="lastName"
            rules={[
              { required: true, message: 'Пожалуйста, введите фамилию!' },
              { min: 2, message: 'Фамилия должна содержать минимум 2 символа!' },
            ]}
          >
            <Input
              data-easytag="id10-react/src/pages/Register.js"
              prefix={<UserOutlined />}
              placeholder="Иванов"
              size="large"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id11-react/src/pages/Register.js"
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
              { min: 6, message: 'Пароль должен содержать минимум 6 символов!' },
            ]}
          >
            <Input.Password
              data-easytag="id12-react/src/pages/Register.js"
              prefix={<LockOutlined />}
              placeholder="••••••"
              size="large"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id13-react/src/pages/Register.js"
            label="Подтверждение пароля"
            name="passwordConfirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Пожалуйста, подтвердите пароль!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password
              data-easytag="id14-react/src/pages/Register.js"
              prefix={<LockOutlined />}
              placeholder="••••••"
              size="large"
            />
          </Form.Item>

          <Form.Item data-easytag="id15-react/src/pages/Register.js">
            <Button
              data-easytag="id16-react/src/pages/Register.js"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div data-easytag="id17-react/src/pages/Register.js" className="text-center">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
