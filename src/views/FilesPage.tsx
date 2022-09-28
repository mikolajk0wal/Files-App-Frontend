import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import FileCard from "../components/FileCard/FileCard";
import { CardsWrapper } from "../components/FileCard/FileCard.styles";
import CustomLoader from "../components/CustomLoader/CustomLoader";
import { FileType } from "../types/FileType";
import {
  Circle,
  ErrorWrapper,
  FilesType,
  ArchiveIcon,
  ErrorMessage,
} from "./FilesPage.styles";
import useModal from "../hooks/useModal";
import {
  isFetchBaseQueryErrorType,
  useGetFilesByTypeQuery,
} from "../services/files";
import { ApiError } from "../types/ApiError";
import { SortType } from "../types/SortType";
import { UIContext } from "../context/UIContext";
import FilterBar from "../components/FilterBar/FilterBar";
import PaginationBar from "../components/PaginationBar/PaginationBar";

interface Props {
  dashboard?: boolean;
}

export type SearchFilters = {
  title?: string;
  subject?: string;
  author?: string;
  page?: number;
  sortType: SortType;
};

const FilesPage: React.FC<Props> = ({ dashboard }) => {
  const { setSortType } = useContext(UIContext);

  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    author: "",
    sortType: "desc",
    subject: "",
    title: "",
    page: 1,
  });

  const [getFilesDto, setGetFilesDto] = useState<SearchFilters>({
    author: "",
    sortType: "desc",
    subject: "",
    title: "",
    page: 1,
  });

  const { pathname } = useLocation();
  const fileType = dashboard
    ? (pathname.slice(11) as FileType)
    : (pathname.slice(1) as FileType);

  const { data, error, isLoading, refetch } = useGetFilesByTypeQuery(
    {
      type: fileType,
      ...getFilesDto,
    },
    { refetchOnMountOrArgChange: false }
  );

  const handleFilterFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setGetFilesDto(searchFilters);
    setSortType(searchFilters.sortType);
  };

  const handlePageChange = (page: number) => {
    setGetFilesDto((prevState) => ({
      ...prevState,
      page,
    }));
  };

  useEffect(() => {
    document.title = `${fileType.toUpperCase()} | Aplikacja do plików`;
    setSearchFilters({ title: "", author: "", subject: "", sortType: "desc" });
    setGetFilesDto({ title: "", author: "", subject: "", sortType: "desc" });
  }, [refetch, fileType]);

  const errorData =
    error && isFetchBaseQueryErrorType(error) ? (error.data as ApiError) : null;

  const showModal = useModal();

  let content;

  if (errorData || error) {
    const SERVER_ERROR_REGEX = /50[0-9]/;
    if (errorData?.status && errorData.status === 404) {
      content = (
        <ErrorWrapper>
          <Circle>
            <ArchiveIcon />
          </Circle>
          <ErrorMessage>Nie znaleziono plików</ErrorMessage>
        </ErrorWrapper>
      );
    } else if (
      errorData?.status &&
      SERVER_ERROR_REGEX.test(errorData.status.toString())
    ) {
      content = (
        <>
          <h1>Wystąpił błąd po stronie serwera</h1>
        </>
      );
    } else {
      (async () => {
        const isConfirmed = await showModal(
          "Dane nie zostały pobrane. Może być to wina twojego połączenia. Ponowić próbę?",
          "error",
          true
        );
        isConfirmed && refetch();
      })();
    }
  } else if (isLoading) {
    content = <CustomLoader />;
  } else if (data && !isLoading) {
    // @TODO Zrobić żeby jak najmniej ANY BYŁo
    const { files, requiredPages } = data;

    content = (
      <>
        <FilesType>
          {fileType !== "other"
            ? `Pliki ${fileType.toUpperCase()}`
            : "Inne pliki"}
        </FilesType>
        <CardsWrapper>
          {files.map(({ _id, authorName, createdAt, subject, title, type }) => (
            <FileCard
              key={_id}
              id={_id}
              authorName={authorName}
              createdAt={createdAt}
              subject={subject}
              title={title}
              type={type}
              setSearchFilters={setSearchFilters}
            />
          ))}
        </CardsWrapper>
        {requiredPages > 1 && (
          <PaginationBar
            currentPage={getFilesDto.page}
            requiredPages={requiredPages}
            handlePageChange={handlePageChange}
          />
        )}
      </>
    );
  }
  return (
    <>
      <FilterBar
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        handleFormSubmit={handleFilterFormSubmit}
        dashboard={dashboard}
      />
      {content}
    </>
  );
};

export default FilesPage;
