import React, { createContext, useState } from 'react';
import { SortType } from '../types/SortType';

export const UIContext = createContext({
  addFileSidebarOpened: false,
  sortType: 'desc' as SortType,
  setSortType: (sortType: SortType) => {},
  openAddFileSidebar: () => {},
  closeAddFileSidebar: () => {},
});

const UIProvider: React.FC = ({ children }) => {
  const [sortType, setSortType] = useState<SortType>('desc');
  const [addFileSidebarOpened, setAddFileSidebarOpened] =
    useState<boolean>(false);

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
        sortType,
        setSortType,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIProvider;
