import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import LoginForm from '../components/AuthForms/LoginForm';
import { RootState } from '../store';

const Login: React.FC = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  return <>{userId ? <Redirect to="/" /> : <LoginForm />}</>;
};

export default Login;
