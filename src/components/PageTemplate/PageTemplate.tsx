import React, { useEffect, Suspense } from 'react';
import { Wrapper } from './PageTemplate.styles';
import Nav from '../Nav/Nav';
import { Route, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';
import { useCheckMeQuery } from '../../services/auth';
import CustomLoader from '../CustomLoader/CustomLoader';
import DashboardNav from '../Nav/DashboardNav';

const AddFileSidebar = React.lazy(
  () => import('../AddFileSidebar/AddFileSidebar')
);

const PageTemplate: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const jwt = localStorage.getItem('jwt');
  const { data } = useCheckMeQuery(jwt);
  const isDashboard = pathname.includes('/dashboard');
  useEffect(() => {
    jwt && dispatch(login({ ...data, jwt }));
  }, [dispatch, data, jwt]);
  return (
    <>
      {isDashboard ? <DashboardNav /> : <Nav />}
      <Wrapper isDashboard={isDashboard}>{children}</Wrapper>
      <Suspense fallback={<CustomLoader />}>
        <Route path={['/pdf', '/img', '/pptx']}>
          <AddFileSidebar />
        </Route>
      </Suspense>
    </>
  );
};

export default PageTemplate;
