import React, { useEffect, Suspense } from 'react';
import { Wrapper } from './PageTemplate.styles';
import Nav from '../Nav/Nav';
import { Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';
import { useCheckMeQuery } from '../../services/auth';
import CustomLoader from '../CustomLoader/CustomLoader';

const AddFileSidebar = React.lazy(
  () => import('../AddFileSidebar/AddFileSidebar')
);

const PageTemplate: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { data } = useCheckMeQuery(jwt);
  useEffect(() => {
    dispatch(login({ ...data, jwt }));
  }, [dispatch, data, jwt]);
  return (
    <>
      <Nav />
      <Wrapper>{children}</Wrapper>
      <Suspense fallback={<CustomLoader />}>
        <Route path={['/pdf', '/img', '/pptx']}>
          <AddFileSidebar />
        </Route>
      </Suspense>
    </>
  );
};

export default PageTemplate;
