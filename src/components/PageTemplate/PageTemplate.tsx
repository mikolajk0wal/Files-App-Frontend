import React, { useEffect, Suspense, useContext } from "react";
import { Wrapper } from "./PageTemplate.styles";
import Nav from "../Nav/Nav";
import { Route, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { useCheckMeQuery } from "../../services/auth";
import CustomLoader from "../CustomLoader/CustomLoader";
import DashboardNav from "../Nav/DashboardNav";
import { GlobalStyles } from "../../theme/globalStyles";
import { darkTheme, lightTheme } from "../../theme/theme";
import { UIContext } from "../../context/UIContext";
import { ThemeProvider } from "styled-components";
import EditFileSidebar from "../Sidebars/EditFileSidebar";
import SettingsModal from "../SettingsModal/SettingsModal";

const AddFileSidebar = React.lazy(() => import("../Sidebars/AddFileSidebar"));

const PageTemplate: React.FC = ({ children }) => {
  const { theme } = useContext(UIContext);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const jwt = localStorage.getItem("jwt");
  const { data } = useCheckMeQuery(jwt);
  const isDashboard = pathname.includes("/dashboard");

  useEffect(() => {
    jwt && dispatch(login({ ...data, jwt }));
  }, [dispatch, data, jwt]);

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        {isDashboard ? <DashboardNav /> : <Nav />}
        <Wrapper isDashboard={isDashboard}>{children}</Wrapper>
        <Suspense fallback={<CustomLoader />}>
          <Route
            path={[
              "/pdf",
              "/img",
              "/other",
              "/users/:name",
              "/dashboard/:type",
            ]}
          >
            <AddFileSidebar />
            <EditFileSidebar />
          </Route>
          <Route path="/users/:name">
            <SettingsModal />
          </Route>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default PageTemplate;
