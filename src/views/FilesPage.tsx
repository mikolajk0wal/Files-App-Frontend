import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { FileType } from "../types/FileType";
import { SortType } from "../types/SortType";
import FilesDisplay from "../components/FilesDisplay/FilesDisplay";
import { isDashboard } from "../utils/isDashboard";
import { FilesType } from "../components/FilesDisplay/FilesDisplay.styles";

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
  useEffect(() => {
    document.title = `${
      fileType !== "other" ? `Pliki ${fileType.toUpperCase()}` : "Inne pliki"
    } | Aplikacja do plików`;
  }, [fileType]);
  return (
    <>
      <FilesType dashboard={dashboard}>
        {fileType !== "other"
          ? `Pliki ${fileType.toUpperCase()}`
          : "Inne pliki"}
      </FilesType>
      <FilesDisplay type={fileType} />
    </>
  );
};

export default FilesPage;
