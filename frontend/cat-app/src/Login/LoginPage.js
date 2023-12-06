import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../requests/main';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginRequest(formData.username, formData.password)

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const tokens = data.tokens
      const refresh_token = tokens.refresh
      const access_token = tokens.access

      localStorage.setItem("refresh_token", refresh_token)
      localStorage.setItem("access_token", access_token)
      console.log("login success")
      
      navigate("/")
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default LoginPage;
