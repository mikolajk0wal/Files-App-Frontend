import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router";
import { UIContext } from "../../context/UIContext";
import { logout } from "../../slices/authSlice";
import { RootState } from "../../store";
import useModal from "../../hooks/useModal";
import {
  LoginNavLink,
  ImgIcon,
  LoginIcon,
  LogoutIcon,
  LogoutButton,
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

  const { userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const showModal = useModal();

  const handleLogout = async () => {
    const isConfirmed = await showModal(
      "Czy napewno chcesz się wylogować ?",
      "question",
      true
    );
    if (isConfirmed) {
      dispatch(logout());
      showModal("Wylogowano pomyślnie", "success", false, "/login");
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

      <Route path={["/pdf", "/img", "/other"]}>
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
        <LogoutButton aria-label="Sign Out" onClick={handleLogout}>
          <LogoutIcon alt="Logout Icon" />
        </LogoutButton>
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
