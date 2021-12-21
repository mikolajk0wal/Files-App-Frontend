import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import RegisterForm from '../components/AuthForms/RegisterForm';
import { RootState } from '../store';

const Register: React.FC = () => {
  useEffect(() => {
    document.title = `Rejestracja | Aplikacja do plików`;
  }, []);
  const { userId } = useSelector((state: RootState) => state.auth);
  return <>{userId ? <Redirect to="/" /> : <RegisterForm />}</>;
};

export default Register;
