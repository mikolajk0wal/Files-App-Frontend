import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import UIProvider from "../context/UIContext";
import CustomLoader from "../components/CustomLoader/CustomLoader";
import FilePage from "./FilePage";

const Login = React.lazy(() => import("./Login"));
const FilesPage = React.lazy(() => import("./FilesPage"));
const Register = React.lazy(() => import("./Register"));
const UsersPage = React.lazy(() => import("./UsersPage"));
const UserPage = React.lazy(() => import("./UserPage"));

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
              <Route
                path={[
                  "/pdf",
                  "/img",
                  "/other",
                  "/dashboard/pdf",
                  "/dashboard/img",
                  "/dashboard/other",
                ]}
              >
                <FilesPage />
              </Route>
              <Route exact path="/file/:slug">
                <FilePage />
              </Route>
              <Route exact path="/users/:login">
                <UserPage />
              </Route>
              <Route exact path="/dashboard">
                <Redirect to="/dashboard/pdf" />
              </Route>

              <Route exact path="/dashboard/users">
                <UsersPage />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/dashboard/users/:login">
                <UserPage />
              </Route>
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </Suspense>
        </PageTemplate>
      </BrowserRouter>
    </UIProvider>
  );
};

export default Root;
