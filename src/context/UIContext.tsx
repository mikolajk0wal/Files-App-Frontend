import React, { createContext, useState } from "react";
import { SortType } from "../types/SortType";

export type Theme = "light" | "dark";

export const UIContext = createContext({
  addFileSidebarOpened: false,
  editFileSidebar: {
    opened: false,
    setOpened: (prop: any) => {},
    initialData: {
      title: "",
      subject: "",
      fileId: "",
    },
    setInitialData: (prop: any) => {},
  },
  filterBarOpened: false,
  setFilterBarOpened: (prop: any) => {},
  setSortType: (sortType: SortType) => {},
  sortType: "desc" as SortType,
  openAddFileSidebar: () => {},
  closeAddFileSidebar: () => {},
  theme: "light" as Theme,
  toggleTheme: () => {},
});

const UIProvider: React.FC = ({ children }) => {
  const localStorageTheme = localStorage.getItem("theme") as Theme;
  const [sortType, setSortType] = useState<SortType>("desc");
  const [theme, setTheme] = useState<Theme>(
    localStorageTheme ? localStorageTheme : "light"
  );

  const toggleTheme = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme((prevstate) => (prevstate === "light" ? "dark" : "light"));
  };

  const [addFileSidebarOpened, setAddFileSidebarOpened] = useState(false);
  const [editFileSidebarOpened, setEditFileSidebarOpened] = useState(false);
  const [editFileInitialData, setEditFileInitialData] = useState({
    subject: "",
    title: "",
    fileId: "",
  });
  const [filterBarOpened, setFilterBarOpened] = useState(false);

  const openAddFileSidebar = () => {
    setAddFileSidebarOpened(true);
  };
  const closeAddFileSidebar = () => {
    setAddFileSidebarOpened(false);
  };

  return (
    <UIContext.Provider
      value={{
        addFileSidebarOpened,
        openAddFileSidebar,
        closeAddFileSidebar,
        setSortType,
        sortType,
        theme,
        toggleTheme,
        filterBarOpened,
        setFilterBarOpened: setFilterBarOpened as any,
        editFileSidebar: {
          opened: editFileSidebarOpened,
          setOpened: setEditFileSidebarOpened,
          initialData: editFileInitialData,
          setInitialData: setEditFileInitialData,
        },
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIProvider;
