import { FaUserCircle } from "react-icons/fa";
import styled, { css } from "styled-components";
import { AiFillSetting } from "react-icons/ai";

interface IconProps {
  alt: string;
}

interface SettingsIconProps {
  alt: string;
  $clicked: boolean;
}

const iconStyles = css`
  width: 130px;
  height: 130px;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.contrastColor};
  border-radius: 65px;
  margin: 20px;
`;

export const UserIcon = styled(FaUserCircle)<IconProps>`
  ${iconStyles}
`;

export const SettingsIcon = styled(AiFillSetting)<SettingsIconProps>`
  ${iconStyles};
  background-color: transparent;
  width: 100px;
  height: 100px;
  transition: 0.3s transform;
  ${({ $clicked }) => ($clicked ? "transform:rotate(25deg);" : "")};
`;

export const SettingsButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  background: #ff0f00;
  color: #fff;
  border: none;
  font-size: 1.5rem;
  margin: 30px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  padding: 20px 50px;
  cursor: pointer;
  border-radius: 40px;
  flex-grow: 0;
  transition: 0.3s background, color;
  &:hover {
    background: #cc0c00;
  }
`;

export const ChangePermissionsButton = styled.button`
  background: #06d6a0;
  color: #fff;
  border: none;
  font-size: 1.5rem;
  margin: 0px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  padding: 20px 50px;
  cursor: pointer;
  border-radius: 40px;
  transition: 0.3s background, color;
  &:hover {
    background: #04b480;
  }
`;

export const Name = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.contrastColor};
`;

export const CreatedInfo = styled.h4`
  font-size: 1.5rem;
  margin: 10px 0;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.contrastColor};
`;

export const InfoWrapper = styled.section`
  margin-top: 130px;
  display: flex;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  @media (max-width: 1664px) {
    margin-top: 200px;
  }
  @media (max-width: 1150px) {
    margin-top: 30px;
  }
  @media (max-width: 430px) {
    margin-top: 100px;
  }
`;

export const UserDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
