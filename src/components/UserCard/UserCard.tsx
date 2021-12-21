import React from 'react';
import { UserType } from '../../enums/UserType';
import {
  AdminIcon,
  InfoWrapper,
  Name,
  UserIcon,
  UserTypeInfo,
  Wrapper,
} from './UserCard.styles';

interface Props {
  type: UserType;
  name: string;
}

const UserCard: React.FC<Props> = ({ name, type }) => {
  return (
    <Wrapper to={`/dashboard/users/${name}`} usertype={type}>
      {type === UserType.moderator ? <AdminIcon /> : <UserIcon />}
      <InfoWrapper>
        <Name>{name}</Name>
        <UserTypeInfo usertype={type}>{type}</UserTypeInfo>
      </InfoWrapper>
    </Wrapper>
  );
};

export default UserCard;
