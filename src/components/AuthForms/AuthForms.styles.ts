import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const CentringWrapper = styled.section`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  @media (max-width: 650px) {
    align-items: flex-start;
    margin-top: 200px;
  }
`;

export const FormWrapper = styled.div`
  padding: 45px;
  background-color: #fff;
  border-radius: 20px;
  z-index: 1000;
  margin: 50px auto;
  max-width: 500px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 650px) {
    padding: 20px;
  }
  @media (max-width: 420px) {
    padding: 10px;
  }
`;

export const StyledInput = styled.input`
  outline: none;
  background-color: #f0f3f8;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  border-radius: 12px;
  padding: 10px 20px;
  margin: 12px;
  font-size: 1.2rem;
  font-weight: 500;
  border: none;
  transition: 0.3s border-color;
  @media (max-width: 420px) {
    margin: 10px;
    font-size: 1.1rem;
    padding: 8px 16px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 2rem;
  margin: 10px 0 40px;
  color: #000;
  @media (max-width: 420px) {
    font-size: 1.75rem;
    margin: 7px 0 35px;
  }
`;

export const Button = styled.button`
  background-color: #faff00;
  border: none;
  margin: 15px;
  padding: 10px 35px;
  border-radius: 25px;
  cursor: pointer;
  font-family: 'Montserrat';
  font-size: 1.4rem;
  font-weight: 600;
  outline: none;
  transition: 0.3s background-color, color;
  &:hover,
  &:focus {
    background-color: #000;
    color: #faff00;
  }
`;

export const StyledNavLink = styled(NavLink)`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 5px;
  text-decoration: none;
  color: #000;
`;

export const SuccessInfo = styled.p`
  margin: 10px;
  font-size: 1.2rem;
  color: green;
`;

export const ErrorInfo = styled.p`
  margin: 10px;
  font-size: 1.2rem;
  color: red;
`;
