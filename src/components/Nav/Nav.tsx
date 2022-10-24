import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory, useLocation } from "react-router";
import { UIContext } from "../../context/UIContext";
import { logout } from "../../slices/authSlice";
import { RootState } from "../../store";
import useModal from "../../hooks/useModal";
import {
  LoginNavLink,
  ImgIcon,
  LoginIcon,
  Navigation,
  StyledNavLink,
  PdfIcon,
  AddIcon,
  AddButton,
  SwitchWrapper,
  SunIcon,
  SearchIcon,
  MoonIcon,
  SearchButton,
  OtherIcon,
  UserIcon,
  UserButton,
} from "./Nav.styles";
import Switch from "react-switch";

const Nav: React.FC = () => {
  const {
    addFileSidebarOpened,
    openAddFileSidebar,
    closeAddFileSidebar,
    setFilterBarOpened,
    filterBarOpened,
    theme,
    toggleTheme,
  } = useContext(UIContext);

  const { userId, login } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const history = useHistory();
  const { pathname } = useLocation();

  const showModal = useModal();

  const handleUserButtonClick = async () => {
    const isConfirmed = await showModal({
      text: "Co chcesz zrobic",
      icon: "question",
      confirm: true,
      cancelText: "Mój profil",
      confirmText: "Wyloguj się",
    });
    if (isConfirmed) {
      dispatch(logout());
      showModal({
        text: "Wylogowano pomyślnie",
        icon: "success",
        confirm: false,
        redirectUrl: "/login",
      });
    } else {
      history.push(`/users/${login}`);
    }
  };
  return (
    <Navigation>
      <SwitchWrapper>
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          checkedIcon={<MoonIcon style={{ margin: 6 }} />}
          uncheckedIcon={<SunIcon style={{ margin: 6 }} />}
        />
      </SwitchWrapper>
      <StyledNavLink aria-label="PDF Files" to="/pdf" activeClassName="active">
        <PdfIcon alt="PDF Icon" />
      </StyledNavLink>
      <StyledNavLink aria-label="IMG Files" to="/img" activeClassName="active">
        <ImgIcon alt="IMG Icon" />
      </StyledNavLink>
      <StyledNavLink
        aria-label="PPTX Files"
        to="/other"
        activeClassName="active"
      >
        <OtherIcon alt="Other Icon" />
      </StyledNavLink>

      <Route path={["/pdf", "/img", "/other", "/users/:name"]}>
        {userId && (
          <AddButton
            aria-label="Open Sidebar"
            clicked={addFileSidebarOpened}
            onClick={
              addFileSidebarOpened ? closeAddFileSidebar : openAddFileSidebar
            }
          >
            <AddIcon alt="Add Icon" />
          </AddButton>
        )}
        <SearchButton
          clicked={filterBarOpened}
          onClick={() => setFilterBarOpened((prevState: any) => !prevState)}
        >
          <SearchIcon alt="Search Icon" />
        </SearchButton>
      </Route>

      {userId ? (
        <UserButton aria-label="Sign Out" onClick={handleUserButtonClick}>
          <UserIcon alt="Logout Icon" />
        </UserButton>
      ) : (
        <LoginNavLink
          aria-label="Sign In"
          to="/login"
          activeClassName="active"
          isActive={() => ["/login", "/register"].includes(pathname)}
        >
          <LoginIcon alt="Login Icon" />
        </LoginNavLink>
      )}
    </Navigation>
  );
};

export default Nav;
