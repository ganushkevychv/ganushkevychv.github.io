import React, { useContext } from 'react';

import './Auth.css';

import { AuthContext } from '../../contexts/AuthContext';

const Auth = ({ cover, children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : cover ? cover() : <p></p>;
};

export default Auth;
