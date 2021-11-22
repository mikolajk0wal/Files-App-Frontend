import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import UIProvider from '../context/UIContext';
import CustomLoader from '../components/CustomLoader/CustomLoader';

const Login = React.lazy(() => import('./Login'));
const FilesPage = React.lazy(() => import('./FilesPage'));
const Register = React.lazy(() => import('./Register'));
const NotFound = React.lazy(() => import('./NotFound'));

const Root = () => {
  return (
    <UIProvider>
      <BrowserRouter>
        <PageTemplate>
          <Suspense fallback={<CustomLoader />}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/pdf" />
              </Route>
              <Route path={['/pdf', '/img', '/pptx']}>
                <FilesPage />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </PageTemplate>
      </BrowserRouter>
    </UIProvider>
  );
};

export default Root;
