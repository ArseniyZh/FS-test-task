import React, { useState } from 'react';
import { logoutRequest } from '../requests/main';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleRedirect = () => {
    setShouldRedirect(true);
    logoutRequest();
    return <Navigate to="/login" />;
  };

  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <p>Вы точно хотите выйти?</p>
      <button onClick={handleRedirect}>Выйти</button>
    </div>
  );
};

export default Logout;