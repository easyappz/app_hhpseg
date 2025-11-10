import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Spin } from 'antd';
import { UserOutlined, MailOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { getProfile, updateProfile } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setFetchingProfile(true);
    try {
      const data = await getProfile();
      updateUser(data);
      form.setFieldsValue({
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response && error.response.status === 404) {
        message.error('Профиль не найден');
      } else {
        message.error('Ошибка загрузки профиля');
      }
    } finally {
      setFetchingProfile(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await updateProfile(
        values.email,
        values.firstName,
        values.lastName
      );
      
      updateUser(data);
      message.success('Профиль успешно обновлен!');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      
      if (error.response && error.response.status === 404) {
        message.error('Профиль не найден');
      } else if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((key) => {
          const errorMessages = Array.isArray(errors[key]) ? errors[key] : [errors[key]];
          errorMessages.forEach((msg) => {
            message.error(`${key}: ${msg}`);
          });
        });
      } else {
        message.error('Ошибка обновления профиля');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue({
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    });
    setEditing(false);
  };

  if (fetchingProfile) {
    return (
      <div data-easytag="id1-react/src/pages/Profile.js" className="flex justify-center items-center min-h-[80vh]">
        <Spin data-easytag="id2-react/src/pages/Profile.js" size="large" />
      </div>
    );
  }

  return (
    <div data-easytag="id3-react/src/pages/Profile.js" className="flex justify-center items-center min-h-[80vh]">
      <Card data-easytag="id4-react/src/pages/Profile.js" className="w-full max-w-md">
        <div data-easytag="id5-react/src/pages/Profile.js" className="flex justify-between items-center mb-6">
          <Title data-easytag="id6-react/src/pages/Profile.js" level={2} className="mb-0">
            Профиль
          </Title>
          {!editing && (
            <Button
              data-easytag="id7-react/src/pages/Profile.js"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setEditing(true)}
            >
              Редактировать
            </Button>
          )}
        </div>
        
        <Form
          data-easytag="id8-react/src/pages/Profile.js"
          form={form}
          name="profile"
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            data-easytag="id9-react/src/pages/Profile.js"
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' },
            ]}
          >
            <Input
              data-easytag="id10-react/src/pages/Profile.js"
              prefix={<MailOutlined />}
              placeholder="example@mail.com"
              size="large"
              disabled={!editing}
            />
          </Form.Item>

          <Form.Item
            data-easytag="id11-react/src/pages/Profile.js"
            label="Имя"
            name="firstName"
            rules={[
              { required: true, message: 'Пожалуйста, введите имя!' },
              { min: 2, message: 'Имя должно содержать минимум 2 символа!' },
            ]}
          >
            <Input
              data-easytag="id12-react/src/pages/Profile.js"
              prefix={<UserOutlined />}
              placeholder="Иван"
              size="large"
              disabled={!editing}
            />
          </Form.Item>

          <Form.Item
            data-easytag="id13-react/src/pages/Profile.js"
            label="Фамилия"
            name="lastName"
            rules={[
              { required: true, message: 'Пожалуйста, введите фамилию!' },
              { min: 2, message: 'Фамилия должна содержать минимум 2 символа!' },
            ]}
          >
            <Input
              data-easytag="id14-react/src/pages/Profile.js"
              prefix={<UserOutlined />}
              placeholder="Иванов"
              size="large"
              disabled={!editing}
            />
          </Form.Item>

          {editing && (
            <Form.Item data-easytag="id15-react/src/pages/Profile.js">
              <div data-easytag="id16-react/src/pages/Profile.js" className="flex gap-2">
                <Button
                  data-easytag="id17-react/src/pages/Profile.js"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                  block
                  size="large"
                >
                  Сохранить
                </Button>
                <Button
                  data-easytag="id18-react/src/pages/Profile.js"
                  onClick={handleCancel}
                  icon={<CloseOutlined />}
                  block
                  size="large"
                >
                  Отмена
                </Button>
              </div>
            </Form.Item>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
