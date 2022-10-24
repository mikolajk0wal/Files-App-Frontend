import { NavLink } from "react-router-dom";
import { MdImage } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { VscFilePdf } from "react-icons/vsc";
import { IoMdAddCircle } from "react-icons/io";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { AiOutlineSearch, AiFillFolder } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

import styled, { css } from "styled-components";

interface NavLinkProps {
  activeClassName: string;
}

interface ActionButtonProps {
  clicked: boolean;
}

interface IconProps {
  alt: string;
}

export const Navigation = styled.nav`
  background-color: ${({ theme }) => theme.primaryColor};
  position: fixed;
  left: 0;
  z-index: 5;
  top: 0;
  padding: 100px 0;
  width: 160px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #5c63db;
  @media (max-width: 650px) {
    width: 100%;
    height: 100px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-bottom: 2px solid #5c63db;
    border-right: none;
  }
  @media (max-width: 430px) {
    flex-wrap: wrap;
    height: 200px;
  }
`;

const navItemCss = css`
  font-size: 1.25rem;
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const buttonCss = css`
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-top: auto;
  @media (max-width: 650px) {
    margin-top: 0;
  }
`;

export const UserButton = styled.button`
  ${navItemCss}
  ${buttonCss}
`;

export const AddButton = styled.button<ActionButtonProps>`
  ${navItemCss}
  ${buttonCss}
  transition: .3s transform;
  ${(props) => (props.clicked ? `transform: rotate(45deg)` : "")}
`;

export const StyledNavLink = styled(NavLink)<NavLinkProps>`
  ${navItemCss};
  margin: 5px;
  @media (max-width: 500px) {
    margin: 0;
  }
  &.${(props) => props.activeClassName} {
    & > svg {
      color: ${({ theme }) => theme.primaryColor};
      background-color: ${({ theme }) => theme.contrastColor};
    }
  }
`;

export const LoginNavLink = styled(StyledNavLink)`
  margin-top: auto;
  @media (max-width: 650px) {
    margin-top: 0;
  }
`;

const IconStyles = css`
  color: #9da8be;
  padding: 10px;
  background-color: transparent;
  width: 75px;
  border-radius: 17px;
  height: 75px;
  margin: 10px;
  @media (max-width: 650px) {
    width: 60px;
    height: 60px;
    border-radius: 13.5px;
    margin: 5px;
  }
  @media (max-width: 530px) {
    width: 50px;
    height: 50px;
    border-radius: 12px;
  }
`;

export const SearchButton = styled.button<ActionButtonProps>`
  ${navItemCss}
  ${buttonCss}
  display:none;
  & > svg {
    transition: 0.3s transform;
    background-color: ${({ theme, clicked }) =>
      clicked ? theme.contrastColor : theme.primaryColor};
    color: ${({ theme, clicked }) =>
      clicked ? theme.primaryColor : "#9da8be;"};
    ${({ clicked }) => (clicked ? "transform: scaleX(-1);" : "")}
  }
  @media (max-width: 1150px) {
    display: flex;
  }
`;

export const SwitchWrapper = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 650px) {
    margin-bottom: 0;
  }
`;

export const MoonIcon = styled(BsFillMoonFill)`
  color: #fff;
  margin: 10px;
`;
export const SunIcon = styled(BsSunFill)`
  color: #fff;
  margin: 10px;
`;

export const PdfIcon = styled(VscFilePdf)<IconProps>`
  ${IconStyles}
`;

export const UserIcon = styled(FaUserCircle)<IconProps>`
  ${IconStyles}
`;

export const ImgIcon = styled(MdImage)<IconProps>`
  ${IconStyles}
`;

export const OtherIcon = styled(AiFillFolder)<IconProps>`
  ${IconStyles}
`;

export const LoginIcon = styled(FiLogIn)<IconProps>`
  ${IconStyles}
`;

export const AddIcon = styled(IoMdAddCircle)<IconProps>`
  ${IconStyles}
`;

export const SearchIcon = styled(AiOutlineSearch)<IconProps>`
  ${IconStyles}
`;
