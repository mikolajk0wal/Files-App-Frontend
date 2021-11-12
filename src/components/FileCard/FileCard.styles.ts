import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';

export const Wrapper = styled.article`
  width: 340px;
  min-height: 250px;
  background-color: #fff;
  border-radius: 45px;
  display: flex;
  margin: 30px;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  @media (max-width: 1050px) {
    margin: 15px;
    width: 270px;
    min-height: 230px;
  }
  @media (max-width: 850px) {
    width: 70%;
    max-width: 350px;
    min-width: 315px;
    justify-content: center;
    min-height: 300px;
  }
`;

export const CardsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;

  align-items: center;
`;

export const LoaderWrapper = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #000;
  padding: 10px;
  text-align: center;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  padding: 5px;
  color: #14213d;
  font-weight: 500;
  text-align: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 10px;
`;

export const DeleteIcon = styled(MdDelete)`
  font-size: 2.5rem;
  color: #d62828;
  border-radius: 15px;
  background-color: #fcbf49;
  border: 2px solid #003049;
  transition: 0.3s background-color, color;
  padding: 5px;
  &:hover {
    background-color: #d62828;
    color: #fcbf49;
  }
`;

export const DownloadButton = styled.a`
  background-color: #20253b;
  color: #fff;
  padding: 10px 30px;
  margin: 15px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s background-color, color;
  &:hover,
  &:focus {
    background-color: #f0f3f8;
    color: #20253b;
  }
  @media (max-width: 1050px) {
    font-size: 1.2rem;
  }
  @media (max-width: 850px) {
    font-size: 1.5rem;
  }
`;
