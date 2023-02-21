import { MdDelete, MdEdit } from "react-icons/md";
import styled, { css } from "styled-components";
import { buttonStyles as buttonComponentStyles } from "../Button/Button";
import { Link } from "react-router-dom";

export const Wrapper = styled.article`
  width: 350px;
  min-height: 280px;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 45px;
  display: flex;
  margin: 30px;
  flex-direction: column;
  padding: 30px 30px 20px 30px;
  align-items: center;
  justify-content: center;
  @media (max-width: 1050px) {
    margin: 15px;
    width: 300px;
    min-height: 230px;
  }
  @media (max-width: 850px) {
    width: 85%;
    max-width: 340px;
    justify-content: center;
    min-height: 280px;
  }
  @media (max-width: 350px) {
    padding: 25px;
    margin: 30px 0;
  }
`;

export const CardsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  //margin-top: 50px;

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
  color: ${({ theme }) => theme.contrastColor};
  padding: 10px;
  text-align: center;
`;

const paragraphStyles = css`
  font-size: 1rem;
  padding: 5px;
  color: ${({ theme }) => theme.cardParagraphColor};
  font-weight: 500;
  text-align: center;
`;

export const Paragraph = styled.p<{ clickable?: boolean }>`
  ${({ clickable }) => (clickable ? "cursor:pointer;" : "")};
  ${paragraphStyles};
`;

export const AuthorLink = styled(Link)`
  text-decoration: none;
  ${paragraphStyles};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  //margin-top: auto;
`;

const iconStyles = css`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primaryColor};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.contrastColor};
  transition: 0.3s background-color, color, border-color;
  border: 2px solid transparent;
  padding: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.contrastColor};
    border-color: ${({ theme }) => theme.contrastColor};
  }
`;

const buttonStyles = css`
  background: none;
  border: none;
  cursor: pointer;
  margin: 10px;
  @media (max-width: 1050px) {
    margin: 5px;
  }
`;

export const DeleteButton = styled.button`
  ${buttonStyles}
`;

export const DeleteIcon = styled(MdDelete)`
  ${iconStyles}
`;

export const EditButton = styled.button`
  ${buttonStyles}
`;

export const EditIcon = styled(MdEdit)`
  ${iconStyles}
`;

export const FileLink = styled(Link)`
  ${buttonComponentStyles};
  padding: 10px 30px;
  margin: 15px;
  border-radius: 20px;
  text-decoration: none;

  @media (max-width: 1050px) {
    font-size: 1.2rem;
  }
  @media (max-width: 850px) {
    font-size: 1.5rem;
  }
  @media (max-width: 350px) {
    font-size: 1.3rem;
    padding: 10px 20px;
  }
`;
