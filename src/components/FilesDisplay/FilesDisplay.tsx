import { FC, useContext, useEffect, useState } from "react";
import { SortType } from "../../types/SortType";
import { FileType } from "../../types/FileType";
import { useGetFilesByTypeQuery } from "../../services/files";
import { CardsWrapper } from "../FileCard/FileCard.styles";
import FileCard from "../FileCard/FileCard";
import PaginationBar from "../PaginationBar/PaginationBar";
import FilterBar from "../FilterBar/FilterBar";
import { UIContext } from "../../context/UIContext";
import FilesLoadingAndErrorHandler from "./FilesLoadingAndErrorHandler";

export type SearchFilters = {
  title?: string;
  subject?: string;
  author?: string;
  page?: number;
  sortType: SortType;
  sortBy: "createdAt" | "fileSize";
};

interface Props {
  type?: FileType;
  login?: string;
}

const FilesDisplay: FC<Props> = ({ type, login }) => {
  const { setSortType, setSortBy } = useContext(UIContext);

  const INITAL_FILTERS: SearchFilters = {
    author: "",
    sortType: "desc",
    subject: "",
    title: "",
    page: 1,
    sortBy: "createdAt",
  };

  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(INITAL_FILTERS);

  const [getFilesDto, setGetFilesDto] = useState<SearchFilters>(INITAL_FILTERS);

  useEffect(() => {
    setSearchFilters(INITAL_FILTERS);
    setGetFilesDto(INITAL_FILTERS);
  }, [type]);
  //@TODO Pokminic czy gdzies render props albo hoc mozna wjebac

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

  const handleFilterFormSubmit = (title?: string) => {
    setGetFilesDto({
      ...searchFilters,
      title: title ? title : searchFilters.title,
    });
    setSortType(searchFilters.sortType);
    setSortBy(searchFilters.sortBy);
  };

  let content = null;

  if (error || isLoading) {
    content = (
      <FilesLoadingAndErrorHandler
        error={error}
        isLoading={isLoading}
        refetch={refetch}
      />
    );
  } else if (data?.files?.length && !isLoading) {
    const { files, requiredPages } = data;

    content = (
      <>
        <CardsWrapper>
          {files.map(
            ({
              _id,
              authorName,
              createdAt,
              subject,
              title,
              type,
              fileSize,
              slug,
              extension,
            }) => (
              <FileCard
                key={_id}
                fileSize={fileSize}
                id={_id}
                slug={slug}
                extension={extension}
                authorName={authorName}
                createdAt={createdAt}
                subject={subject}
                title={title}
                type={type}
                setSearchFilters={setSearchFilters}
              />
            )
          )}
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
