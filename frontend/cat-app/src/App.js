import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './Login/LoginPage';
import RegistrationPage from './Registration/RegistrationPage';
import Navbar from './components/navBar';
import Logout from './components/logout';
import MainPage from './mainPages/mainPage';
import EditPage from './mainPages/editCat';
import CreatePage from './mainPages/createCat';
import ChatPage from './mainPages/chatPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="" element={<MainPage />}/>
        <Route exact path="/" element={<MainPage />}/>
        <Route exact path="/registration" element={<RegistrationPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/edit/:id" element={<EditPage />} />
        <Route exact path="/create" element={<CreatePage />} />
        <Route exact path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;