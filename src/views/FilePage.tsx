import {
  InfoWrapper,
  Paragraph,
  PdfIcon,
  ImgIcon,
  OtherIcon,
  Title,
  FileWrapper,
  ButtonsWrapper,
  DownloadButton,
  DeleteButton,
  EditButton,
} from "./FilePage.styles";
import { useGetFileBySlugQuery } from "../services/files";
import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useMemo } from "react";
import FilesLoadingAndErrorHandler from "../components/FilesDisplay/FilesLoadingAndErrorHandler";
import { readAbleFileSize } from "../utils/readableFileSize";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UserType } from "../enums/UserType";
import { UIContext } from "../context/UIContext";

const ICONS = {
  pdf: <PdfIcon alt="Ikona PDF" />,
  img: <ImgIcon alt="Ikona IMG" />,
  other: <OtherIcon alt="Ikona pliku" />,
};

const FilePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: file, error, isLoading, refetch } = useGetFileBySlugQuery(slug);
  const { type: userType, login } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    title,
    authorName,
    subject,
    createdAt,
    extension,
    fileSize,
    type,
    _id,
  } = file || {};

  const { editFileSidebar } = useContext(UIContext);

  useEffect(() => {
    if (file) {
      document.title = `${title} | Aplikacja do plików`;
    }
  }, [file]);

  const handleEditButtonClick = useCallback(() => {
    editFileSidebar.setInitialData({ title, subject, fileId: _id });
    editFileSidebar.setOpened(true);
  }, [title, subject, _id]);

  if (file && !isLoading) {
    const canEdit = authorName === login;
    const canDelete =
      authorName === login ||
      userType === UserType.admin ||
      userType === UserType.moderator;

    return (
      <>
        <FileWrapper>
          {ICONS[file.type]}
          <InfoWrapper>
            <Title>{title}</Title>
            <Paragraph>Dodany przez: {authorName}</Paragraph>
            <Paragraph>Temat: {subject}</Paragraph>
            <Paragraph>
              Data dodania: {dayjs(createdAt).format("DD/MM/YYYY")}
            </Paragraph>
            <Paragraph>Rozszerzenie: .{extension}</Paragraph>
            <Paragraph>
              Rozmiar pliku: {readAbleFileSize(file.fileSize)}
            </Paragraph>
          </InfoWrapper>
        </FileWrapper>
        <ButtonsWrapper>
          {canEdit && (
            <EditButton onClick={handleEditButtonClick}>Edytuj plik</EditButton>
          )}
          <DownloadButton
            as="a"
            href={
              process.env.NODE_ENV === "development"
                ? `http://localhost:8000/api/files/file/slug/${slug}`
                : `${document.location.origin}/api/files/file/slug/${slug}`
            }
          >
            Pobierz
          </DownloadButton>
          {canDelete && <DeleteButton>Usuń plik</DeleteButton>}
        </ButtonsWrapper>
      </>
    );
  }
  return (
    <FilesLoadingAndErrorHandler
      error={error}
      isLoading={isLoading}
      refetch={refetch}
    />
  );
};

export default FilePage;
