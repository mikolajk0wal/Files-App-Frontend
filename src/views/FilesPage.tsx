import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import FileCard from '../components/FileCard/FileCard';
import { CardsWrapper } from '../components/FileCard/FileCard.styles';
import CustomLoader from '../components/CustomLoader/CustomLoader';
import { FileType } from '../types/FileType';
import { FilesType } from './FilesPage.styles';
import useModal from '../hooks/useModal';
import {
  isFetchBaseQueryErrorType,
  useGetFilesByTypeQuery,
} from '../services/files';
import { ApiError } from '../types/ApiError';
import Select from 'react-select';
import { selectStyles } from '../components/AddFileSidebar/AddFileSidebar.styles';
import { SortType } from '../types/SortType';
import { UIContext } from '../context/UIContext';

interface Props {
  dashboard?: boolean;
}

const FilesPage: React.FC<Props> = ({ dashboard }) => {
  const { sortType, setSortType } = useContext(UIContext);
  const { pathname } = useLocation();
  const fileType = dashboard
    ? (pathname.slice(11) as FileType)
    : (pathname.slice(1) as FileType);

  const {
    data: files,
    error,
    isLoading,
    refetch,
  } = useGetFilesByTypeQuery({ type: fileType, sortType });

  useEffect(() => {
    refetch();
    document.title = `${fileType.toUpperCase()} | Aplikacja do plików`;
  }, [sortType, refetch, fileType]);

  const selectOptions = [
    { value: 'desc' as SortType, label: 'Od Najnowszego' },
    { value: 'asc' as SortType, label: 'Od Najstarszego' },
  ];

  const errorData =
    error && isFetchBaseQueryErrorType(error) ? (error.data as ApiError) : null;

  const showModal = useModal();

  let content;

  if (errorData || error) {
    const SERVER_ERROR_REGEX = /50[0-9]/;
    if (errorData?.status && errorData.status === 404) {
      showModal('Nie znaleziono plików', 'error', false);
    } else if (
      errorData?.status &&
      SERVER_ERROR_REGEX.test(errorData.status.toString())
    ) {
      showModal('Wystąpił błąd po stronie serwera', 'error', false);
    } else {
      (async () => {
        const isConfirmed = await showModal(
          'Dane nie zostały pobrane. Może być to wina twojego połączenia. Ponowić próbę?',
          'error',
          true
        );
        isConfirmed && refetch();
      })();
    }
  } else if (isLoading) {
    content = <CustomLoader />;
  } else if (files && !isLoading) {
    content = (
      <>
        <Select
          options={selectOptions}
          styles={selectStyles}
          id="filetype"
          name="filetype"
          value={{
            label: sortType === 'asc' ? 'Od Najstarszego' : 'Od Najnowszego',
            value: sortType,
          }}
          isSearchable={false}
          onChange={(data) => {
            if (data?.value) {
              setSortType(data.value as SortType);
            }
          }}
        />
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
            />
          ))}
        </CardsWrapper>
      </>
    );
  }
  return (
    <>
      <FilesType>{fileType.toUpperCase()} Files</FilesType>
      {content}
    </>
  );
};

export default FilesPage;
