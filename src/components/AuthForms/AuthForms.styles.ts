import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

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
  background-color: ${({ theme }) => theme.primaryColor};
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

export const StyledInput = styled(Input)`
  padding: 10px 20px;
  margin: 12px;
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
  color: ${({ theme }) => theme.contrastColor};
  @media (max-width: 420px) {
    font-size: 1.75rem;
    margin: 7px 0 35px;
  }
`;

export const SubmitButton = styled(Button)`
  margin: 15px;
  padding: 10px 35px;
  border-radius: 25px;
  background-color: #fff500;
  color: #18202d;
  border: none;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.contrastColor};
    color: ${({ theme }) => theme.primaryColor};
  }
`;

export const StyledNavLink = styled(NavLink)`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.contrastColor};
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
