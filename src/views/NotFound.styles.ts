import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const InfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @media (max-width: 650px) {
    height: calc(100vh - 100px);
  }
`;

export const ErrorHeader = styled.h1`
  color: #e63946;
  margin: 20px;
  text-align: center;
  font-size: 3rem;
`;

export const ErrorParagraph = styled.p`
  color: #1d3557;
  margin: 20px;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
`;

export const GoBackLink = styled(Link)`
  background-color: #e63946;
  color: #fff;
  transition: 0.4s background-color, color;
  text-decoration: none;
  font-size: 1.5rem;
  /* border-radius: 20px; */
  padding: 20px;
  font-weight: 600;
  margin: 20px;
  border: 2px solid black;
  &:hover,
  &:focus {
    background-color: #fff;
    color: #e63946;
    border: 2px solid black;
  }
`;
