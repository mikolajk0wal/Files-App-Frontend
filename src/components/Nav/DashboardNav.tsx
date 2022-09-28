import React from "react";
import { Redirect } from "react-router";
import { UserType } from "../../enums/UserType";
import { useCheckMeQuery } from "../../services/auth";
import {
  DashboardNavigation,
  StyledNavLink,
  PdfIcon,
  Paragraph,
  ImgIcon,
  OtherIcon,
  UserIcon,
  StyledBackLink,
  GoBackIcon,
} from "./DashboardNav.styles";

const DashboardNav = () => {
  const jwt = localStorage.getItem("jwt");
  const { data, isLoading } = useCheckMeQuery(jwt);
  if (!isLoading) {
    return data?.type === UserType.admin ? (
      <DashboardNavigation>
        <StyledNavLink to="/dashboard/pdf" activeClassName="active">
          <PdfIcon alt="PDF ICON" />
          <Paragraph>PLIKI PDF</Paragraph>
        </StyledNavLink>
        <StyledNavLink to="/dashboard/img" activeClassName="active">
          <ImgIcon alt="IMG ICON" />
          <Paragraph>PLIKI IMG</Paragraph>
        </StyledNavLink>
        <StyledNavLink to="/dashboard/other" activeClassName="active">
          <OtherIcon alt="Other ICON" />
          <Paragraph>INNE PLIKI</Paragraph>
        </StyledNavLink>
        <StyledNavLink to="/dashboard/users" activeClassName="active">
          <UserIcon alt="USERS ICON" />
          <Paragraph>UŻYTKOWNICY</Paragraph>
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
