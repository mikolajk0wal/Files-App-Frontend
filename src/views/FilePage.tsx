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
} from "./FilePage.styles";
import { useGetFileBySlugQuery } from "../services/files";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import FilesLoadingAndErrorHandler from "../components/FilesDisplay/FilesLoadingAndErrorHandler";
import { readAbleFileSize } from "../utils/readableFileSize";
import dayjs from "dayjs";

const ICONS = {
  pdf: <PdfIcon alt="Ikona PDF" />,
  img: <ImgIcon alt="Ikona IMG" />,
  other: <OtherIcon alt="Ikona pliku" />,
};

const FilePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: file, error, isLoading, refetch } = useGetFileBySlugQuery(slug);

  useEffect(() => {
    if (file) {
      document.title = `${file.title} | Aplikacja do plików`;
    }
  }, [file]);
  if (file && !isLoading) {
    const { title, authorName, subject, createdAt, extension, fileSize, type } =
      file;
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
