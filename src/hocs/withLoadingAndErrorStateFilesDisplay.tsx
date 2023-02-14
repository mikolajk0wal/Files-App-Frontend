import { FC, useContext, useState } from "react";
import { FileType } from "../types/FileType";
import { UIContext } from "../context/UIContext";
import { useGetFilesByTypeQuery } from "../services/files";
import { SearchFilters } from "../components/FilesDisplay/FilesDisplay";
import FilterBar from "../components/FilterBar/FilterBar";
import FilesLoadingAndErrorHandler from "../components/FilesDisplay/FilesLoadingAndErrorHandler";

interface FilesDisplayProps {
  type: FileType;
  login?: string;
}

//@TODO Może zrobić tego hoca tak tylko dla nauki bo szczerze idk czy to ma sens

const withLoadingAndErrorStateFilesDisplay =
  (Component: any) =>
  ({ type, login }: FilesDisplayProps) => {
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
    const { data, error, isLoading, refetch } = useGetFilesByTypeQuery(
      {
        type,
        ...getFilesDto,
        userPage: !!login,
        author: login ? login : getFilesDto.author,
      },
      { refetchOnMountOrArgChange: true }
    );

    if (error || isLoading) {
      return (
        <>
          <FilesLoadingAndErrorHandler
            error={error}
            isLoading={isLoading}
            refetch={refetch}
          />
        </>
      );
    } else if (data?.files?.length && !isLoading) {
      return <Component />;
    }
  };
