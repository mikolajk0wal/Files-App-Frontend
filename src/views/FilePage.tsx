import {
  InfoWrapper,
  Paragraph,
  PdfIcon,
  Title,
  Wrapper,
} from "./FilePage.styles";
import { useGetFileBySlugQuery } from "../services/files";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import FilesLoadingAndErrorHandler from "../components/FilesDisplay/FilesLoadingAndErrorHandler";
import { readAbleFileSize } from "../utils/readableFileSize";
import dayjs from "dayjs";

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
      <Wrapper>
        <PdfIcon alt="Ikona PDF" />
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
      </Wrapper>
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
