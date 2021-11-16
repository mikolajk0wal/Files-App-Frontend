import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useLocation } from 'react-router';
import { UIContext } from '../../context/UIContext';
import { logout } from '../../slices/authSlice';
import { RootState } from '../../store';
import useModal from '../../hooks/useModal';
import {
  LoginNavLink,
  ImgIcon,
  LoginIcon,
  LogoutIcon,
  LogoutButton,
  Navigation,
  StyledNavLink,
  PdfIcon,
  PptxIcon,
  AddIcon,
  AddButton,
} from './Nav.styles';

const Nav: React.FC = () => {
  const { addFileSidebarOpened, openAddFileSidebar, closeAddFileSidebar } =
    useContext(UIContext);

  const { userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const showModal = useModal();

  const handleLogout = async () => {
    const isConfirmed = await showModal(
      'Czy napewno chcesz się wylogować ?',
      'question',
      true
    );
    if (isConfirmed) {
      dispatch(logout());
      showModal('Wylogowano pomyślnie', 'success', false, '/login');
    }
  };

  return (
    <Navigation>
      <StyledNavLink aria-label="PDF Files" to="/pdf" activeClassName="active">
        <PdfIcon alt="PDF Icon" />
      </StyledNavLink>
      <StyledNavLink aria-label="IMG Files" to="/img" activeClassName="active">
        <ImgIcon alt="IMG Icon" />
      </StyledNavLink>
      <StyledNavLink
        aria-label="PPTX Files"
        to="/pptx"
        activeClassName="active"
      >
        <PptxIcon alt="PPTX Icon" />
      </StyledNavLink>

      {userId && (
        <Route path={['/pdf', '/img', '/pptx']}>
          <AddButton
            aria-label="Open Sidebar"
            clicked={addFileSidebarOpened}
            onClick={
              addFileSidebarOpened ? closeAddFileSidebar : openAddFileSidebar
            }
          >
            <AddIcon alt="Add Icon" />
          </AddButton>
        </Route>
      )}
      {userId ? (
        <LogoutButton aria-label="Sign Out" onClick={handleLogout}>
          <LogoutIcon alt="Logout Icon" />
        </LogoutButton>
      ) : (
        <LoginNavLink
          aria-label="Sign In"
          to="/login"
          activeClassName="active"
          isActive={() => ['/login', '/register'].includes(pathname)}
        >
          <LoginIcon alt="Login Icon" />
        </LoginNavLink>
      )}
    </Navigation>
  );
};

export default Nav;
