import React from 'react';
import { Redirect } from 'react-router';
import { UserType } from '../../enums/UserType';
import { useCheckMeQuery } from '../../services/auth';
import {
  DashboardNavigation,
  StyledNavLink,
  PdfIcon,
  Paragraph,
  ImgIcon,
  PptxIcon,
  UserIcon,
  StyledBackLink,
  GoBackIcon,
} from './DashboardNav.styles';

const DashboardNav = () => {
  const jwt = localStorage.getItem('jwt');
  const { data, isLoading } = useCheckMeQuery(jwt);
  if (!isLoading) {
    return data?.type === UserType.admin ? (
      <DashboardNavigation>
        <StyledNavLink to="/dashboard/pdf" activeClassName="active">
          <PdfIcon alt="PDF ICON" />
          <Paragraph>PDF FILES</Paragraph>
        </StyledNavLink>
        <StyledNavLink to="/dashboard/img" activeClassName="active">
          <ImgIcon alt="IMG ICON" />
          <Paragraph>IMG FILES</Paragraph>
        </StyledNavLink>
        <StyledNavLink to="/dashboard/pptx" activeClassName="active">
          <PptxIcon alt="PPTX ICON" />
          <Paragraph>PPTX FILES</Paragraph>
        </StyledNavLink>
        <StyledNavLink to="/dashboard/users" activeClassName="active">
          <UserIcon alt="USERS ICON" />
          <Paragraph>USERS</Paragraph>
        </StyledNavLink>
        <StyledBackLink to="/" exact activeClassName="active">
          <GoBackIcon alt="USERS ICON" />
          <Paragraph>Powrót</Paragraph>
        </StyledBackLink>
      </DashboardNavigation>
    ) : (
      <Redirect to="/" />
    );
  } else {
    return <p>Loading</p>;
  }
};

export default DashboardNav;
