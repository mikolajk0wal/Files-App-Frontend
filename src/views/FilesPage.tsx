import React from "react";
import { useLocation } from "react-router";
import { FileType } from "../types/FileType";
import { SortType } from "../types/SortType";
import FilesDisplay from "../components/FilesDisplay/FilesDisplay";
import { isDashboard } from "../utils/isDashboard";

export type SearchFilters = {
  title?: string;
  subject?: string;
  author?: string;
  page?: number;
  sortType: SortType;
};

const FilesPage = () => {
  const dashboard = isDashboard();
  const { pathname } = useLocation();
  const fileType = dashboard
    ? (pathname.slice(11) as FileType)
    : (pathname.slice(1) as FileType);

  return (
    <>
      <FilesDisplay type={fileType} />
    </>
  );
};

export default FilesPage;
