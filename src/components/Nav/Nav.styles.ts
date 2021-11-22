import { NavLink } from 'react-router-dom';
import { MdImage } from 'react-icons/md';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { VscFilePdf } from 'react-icons/vsc';
import { IoMdAddCircle } from 'react-icons/io';

import { HiPresentationChartLine } from 'react-icons/hi';

import styled, { css } from 'styled-components';

interface NavLinkProps {
  activeClassName: string;
}

interface AddButtonProps {
  clicked: boolean;
}

interface IconProps {
  alt: string;
}

export const Navigation = styled.nav`
  background-color: #fff;
  position: fixed;
  left: 0;
  z-index: 5;
  top: 0;
  padding: 100px 0;
  width: 160px;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 650px) {
    width: 100%;
    height: 100px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  @media (max-width: 335px) {
    flex-wrap: wrap;
    /* height: 200px; */
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

export const LogoutButton = styled.button`
  ${navItemCss}
  ${buttonCss}
`;

export const AddButton = styled.button<AddButtonProps>`
  ${navItemCss}
  ${buttonCss}
  transition: .3s transform;
  ${(props) => (props.clicked ? `transform: rotate(45deg)` : '')}
`;

export const StyledNavLink = styled(NavLink)<NavLinkProps>`
  ${navItemCss}
  margin:5px;
  @media (max-width: 500px) {
    margin: 0;
  }
  &.${(props) => props.activeClassName} {
    & > svg {
      color: white;
      background-color: #20253b;
    }
  }
`;

export const LoginNavLink = styled(StyledNavLink)`
  margin-top: auto;
  @media (max-width: 650px) {
    margin-top: 0;
    margin-left: auto;
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
  @media (max-width: 485px) {
    width: 60px;
    height: 60px;
    border-radius: 13.5px;
  }
  @media (max-width: 360px) {
    width: 50px;
    height: 50px;
    margin: 5px;
    border-radius: 12.5px;
  }
  @media (max-width: 340px) {
    width: 45px;
    height: 45px;
    border-radius: 12px;
  }
`;

export const PdfIcon = styled(VscFilePdf)<IconProps>`
  ${IconStyles}
`;

export const ImgIcon = styled(MdImage)<IconProps>`
  ${IconStyles}
`;

export const PptxIcon = styled(HiPresentationChartLine)<IconProps>`
  ${IconStyles}
`;

export const LoginIcon = styled(FiLogIn)<IconProps>`
  ${IconStyles}
`;

export const RegisterIcon = styled(HiPresentationChartLine)<IconProps>`
  ${IconStyles}
`;

export const LogoutIcon = styled(FiLogOut)<IconProps>`
  ${IconStyles}
`;

export const AddIcon = styled(IoMdAddCircle)<IconProps>`
  ${IconStyles}
`;
