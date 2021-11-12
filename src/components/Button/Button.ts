import styled from 'styled-components';

export const Button = styled.button`
  font-size: 1.5rem;
  color: #000;
  background-color: #faff00;
  text-align: center;
  padding: 10px 50px;
  cursor: pointer;
  border: none;
  margin-top: 20px;
  border-radius: 20px;
  font-weight: 600;
  outline: none;
  transition: 0.3s background-color, color;
  &:hover,
  &:focus {
    color: #1d3557;
    background-color: #e63946;
  }
`;
