import { FaUserCircle } from 'react-icons/fa';
import { AiFillTool } from 'react-icons/ai';
import styled, { css } from 'styled-components';
import { UserType } from '../../enums/UserType';
import { Link } from 'react-router-dom';

interface Props {
  usertype: UserType;
}

export const Wrapper = styled(Link)<Props>`
  width: 300px;
  border: 4px solid
    ${({ usertype }) =>
      usertype === UserType.moderator ? '#06D6A0' : '#073b4c'};
  padding: 20px;
  border-radius: 20px;
  text-decoration: none;
  background-color: #ffffff;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const InfoWrapper = styled.div`
  overflow: hidden;
`;

export const Name = styled.h4`
  color: #118ab2;
  font-size: 1.6rem;
  margin: 0 20px;
`;

export const UserTypeInfo = styled.p<Props>`
  color: ${({ usertype }) =>
    usertype === UserType.moderator ? '#06D6A0' : '#073b4c'};
  font-size: 1.4rem;
  font-weight: 600;
  margin: 10px 0;
  text-align: center;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const IconStyles = css`
  width: 75px;
  height: 75px;
  flex-shrink: 0;
`;

export const UserIcon = styled(FaUserCircle)`
  ${IconStyles}
  background-color: #20253b;
  color: #fff;
  border-radius: 37.5px;
  border: 4px solid #20253b;
`;

export const AdminIcon = styled(AiFillTool)`
  ${IconStyles}
  color:#20253B;
`;
