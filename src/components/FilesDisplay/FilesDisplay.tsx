import { FC, useContext, useState } from "react";
import { SortType } from "../../types/SortType";
import { FileType } from "../../types/FileType";

import {
  isFetchBaseQueryErrorType,
  useGetFilesByTypeQuery,
} from "../../services/files";

import { CardsWrapper } from "../FileCard/FileCard.styles";
import FileCard from "../FileCard/FileCard";
import PaginationBar from "../PaginationBar/PaginationBar";
import FilterBar from "../FilterBar/FilterBar";
import { UIContext } from "../../context/UIContext";
import { FilesType } from "./FilesDisplay.styles";
import { ApiError } from "../../types/ApiError";
import useModal from "../../hooks/useModal";
import CustomLoader from "../CustomLoader/CustomLoader";
import { isDashboard } from "../../utils/isDashboard";
import NotFoundError from "../NotFoundError/NotFoundError";

export type SearchFilters = {
  title?: string;
  subject?: string;
  author?: string;
  page?: number;
  sortType: SortType;
};

interface Props {
  type: FileType;
  login?: string;
}

const FilesDisplay: FC<Props> = ({ type, login }) => {
  const dashboard = isDashboard();
  const { setSortType } = useContext(UIContext);
  const showModal = useModal();

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

  const { data, error, isLoading, refetch } = useGetFilesByTypeQuery(
    {
      type,
      ...getFilesDto,
      userPage: !!login,
      author: login ? login : getFilesDto.author,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handlePageChange = (page: number) => {
    setGetFilesDto((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const handleFilterFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setGetFilesDto(searchFilters);
    setSortType(searchFilters.sortType);
  };

  const errorData =
    error && isFetchBaseQueryErrorType(error) ? (error.data as ApiError) : null;

  let content;

  if (errorData || error) {
    const SERVER_ERROR_REGEX = /50[0-9]/;
    if (errorData?.status && errorData.status === 404) {
      content = (
        <NotFoundError centered={!login}>Nie znaleziono plików</NotFoundError>
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
        const isConfirmed = await showModal({
          text: "Dane nie zostały pobrane. Może być to wina twojego połączenia. Ponowić próbę?",
          icon: "error",
          confirm: true,
        });
        isConfirmed && refetch();
      })();
    }
  } else if (isLoading) {
    content = <CustomLoader />;
  } else if (data?.files?.length && !isLoading) {
    const { files, requiredPages } = data;
    content = (
      <>
        {!login && (
          <FilesType dashboard={dashboard}>
            {type !== "other" ? `Pliki ${type.toUpperCase()}` : "Inne pliki"}
          </FilesType>
        )}

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
      />
      {content}
    </>
  );
};

export default FilesDisplay;
