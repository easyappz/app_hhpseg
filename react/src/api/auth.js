import instance from './axios';

export const register = async (email, firstName, lastName, password, passwordConfirm) => {
  const response = await instance.post('/api/auth/register/', {
    email,
    first_name: firstName,
    last_name: lastName,
    password,
    password_confirm: passwordConfirm,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await instance.post('/api/auth/login/', {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  const refresh = localStorage.getItem('refresh');
  const response = await instance.post('/api/auth/logout/', {
    refresh,
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await instance.get('/api/auth/profile/');
  return response.data;
};

export const updateProfile = async (email, firstName, lastName) => {
  const response = await instance.put('/api/auth/profile/', {
    email,
    first_name: firstName,
    last_name: lastName,
  });
  return response.data;
};
