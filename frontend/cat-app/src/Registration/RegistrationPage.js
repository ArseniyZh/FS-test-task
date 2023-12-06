import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrationRequest, loginRequest } from '../requests/main';

const RegistrationPage = () => {
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
      const response = await registrationRequest(formData.username, formData.password)
      console.log(response)

      if (!response.ok) {
        console.log(response.body)
        console.log(await response.json())
        throw new Error('Registration failed');
      }

      const _response = await loginRequest(formData.username, formData.password)

      if (!_response.ok) {
        throw new Error('Login failed');
      }

      const data = await _response.json();
      const tokens = data.tokens
      const refresh_token = tokens.refresh
      const access_token = tokens.access

      localStorage.setItem("refresh_token", refresh_token)
      localStorage.setItem("access_token", access_token)

      navigate("/")      
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Registration Page</h2>
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
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default RegistrationPage;
