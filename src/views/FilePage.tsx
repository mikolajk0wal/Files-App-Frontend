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
import { useEffect } from "react";
import FilesLoadingAndErrorHandler from "../components/FilesDisplay/FilesLoadingAndErrorHandler";
import { readAbleFileSize } from "../utils/readableFileSize";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UserType } from "../enums/UserType";

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

  useEffect(() => {
    if (file) {
      document.title = `${file.title} | Aplikacja do plików`;
    }
  }, [file]);
  if (file && !isLoading) {
    const { title, authorName, subject, createdAt, extension, fileSize, type } =
      file;
    const canEdit = authorName === login;
    const canDelete =
      authorName === login ||
      userType === UserType.admin ||
      userType === UserType.moderator;
    return (
      <>
        <FileWrapper>
          {ICONS[type]}
          <InfoWrapper>
            <Title>{title}</Title>
            <Paragraph>Dodany przez: {authorName}</Paragraph>
            <Paragraph>Temat: {subject}</Paragraph>
            <Paragraph>
              Data dodania: {dayjs(createdAt).format("DD/MM/YYYY")}
            </Paragraph>
            <Paragraph>Rozszerzenie: .{extension}</Paragraph>
            <Paragraph>Rozmiar pliku: {readAbleFileSize(fileSize)}</Paragraph>
          </InfoWrapper>
        </FileWrapper>
        <ButtonsWrapper>
          {canEdit && <EditButton>Edytuj plik</EditButton>}
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
