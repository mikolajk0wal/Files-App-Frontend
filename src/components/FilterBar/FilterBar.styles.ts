import styled, { css } from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";

interface Props {
  opened: boolean;
  dashboard?: boolean;
}

export const Wrapper = styled.form<Props>`
  width: calc(100vw - ${({ dashboard }) => (dashboard ? "300px" : "160px")});
  position: absolute;
  top: 0;
  left: ${({ dashboard }) => (dashboard ? "300px" : "160px")};
  border-bottom: 2px solid #5c63db;
  background-color: ${({ theme }) => theme.primaryColor};
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1150px) {
    width: 95%;
    max-width: 300px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: ${({ dashboard }) => (dashboard ? "140px" : "0")};
    z-index: 3;
    transition: 0.3s transform;
    transform: translateX(${({ opened }) => (opened ? "160px" : "-300px")});
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding: 50px 0;
    border-bottom: none;
  }
  @media (max-width: 650px) {
    transform: translateX(${({ opened }) => (opened ? "0" : "-500px")});
    left: 0;
    top: 100px;
    border-left: none;
    border-right: 2px solid #5c63db;
  }
  @media (max-width: 430px) {
    top: ${({ dashboard }) => (dashboard ? "100px" : "200px")};
  }
`;

export const FilterWrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  position: relative;
  width: 30%;
  max-width: 300px;
  border-right: 0.5px solid rgba(162, 167, 170, 0.3);
  @media (max-width: 1475px) {
    margin-top: 5px;
    border: none;
  }
  @media (max-width: 1150px) {
    max-width: none;
    width: 90%;
    height: auto;
  }
`;

export const SearchWrapper = styled.article`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  padding: 30px 60px 30px 30px;
  position: relative;
  flex-grow: 1;
  @media (max-width: 1150px) {
    flex-grow: 0;
    height: auto;
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 0;
  }
`;

const iconStyles = css`
  font-size: 2rem;
  color: #5c63db;
  font-weight: 700;
`;

export const SearchIcon = styled(AiOutlineSearch)`
  ${iconStyles}
`;

export const SubjectIcon = styled(FaQuestionCircle)`
  ${iconStyles}
`;

export const AuthorIcon = styled(BsPencilFill)`
  ${iconStyles}
`;

export const SearchInput = styled.input`
  margin-left: 10px;
  font-family: "Montserrat", sans-serif;
  color: ${({ theme }) => theme.contrastColor};
  font-weight: 500;
  padding: 5px 10px;
  font-size: 1rem;
  border: none;
  background: transparent;
  border-bottom: 2px solid #5c63db;
  &::placeholder {
    color: ${({ theme }) => theme.contrastColor};
    opacity: 0.8;
  }
`;

export const SearchButton = styled.button`
  margin-left: auto;
  cursor: pointer;
  background-color: #5c63db;
  text-align: center;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1.3rem;
  color: #fff;
  @media (max-width: 1570px) {
    margin-left: 20px;
    font-size: 1.1rem;
  }
  @media (max-width: 1150px) {
    margin-top: 30px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  z-index: 16;
  display: none;
  border: none;
  background: transparent;
`;

export const CloseIcon = styled(IoMdCloseCircle)`
  width: 40px;
  color: #ff0000;
  cursor: pointer;
  height: 40px;
`;
