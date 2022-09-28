import styled from "styled-components";

export const Button = styled.button`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.primaryColor};
  background-color: ${({ theme }) => theme.contrastColor};
  border: 2px solid transparent;
  text-align: center;
  padding: 10px 50px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  border-radius: 15px;
  font-weight: 600;
  outline: none;
  transition: 0.3s background-color, color, border-color;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.contrastColor};
    background-color: ${({ theme }) => theme.primaryColor};
    border-color: ${({ theme }) => theme.contrastColor};
  }
`;
