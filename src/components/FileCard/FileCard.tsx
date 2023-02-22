import React, { useContext } from "react";
import dayjs from "dayjs";
import { FileType } from "../../types/FileType";
import {
  ButtonsWrapper,
  DeleteButton,
  DeleteIcon,
  Paragraph,
  Title,
  Wrapper,
  EditButton,
  EditIcon,
  AuthorLink,
  FileLink,
} from "./FileCard.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useModal from "../../hooks/useModal";
import { useDeleteFileMutation } from "../../services/files";
import { UIContext } from "../../context/UIContext";
import { UserType } from "../../enums/UserType";
import { SearchFilters } from "../FilesDisplay/FilesDisplay";
import { readAbleFileSize } from "../../utils/readableFileSize";

interface Props {
  title: string;
  authorName: string;
  subject: string;
  type: FileType;
  createdAt: string;
  id: string;
  fileSize: number;
  slug: string;
  extension: string;
  setSearchFilters?: React.Dispatch<React.SetStateAction<SearchFilters>>;
}

const FileCard: React.FC<Props> = ({
  title,
  authorName,
  subject,
  createdAt,
  id,
  type,
  setSearchFilters,
  slug,
  extension,
  fileSize,
}) => {
  const { sortType, editFileSidebar, sortBy } = useContext(UIContext);
  const [deleteFile] = useDeleteFileMutation();
  const { login, type: userType } = useSelector(
    (state: RootState) => state.auth
  );
  const showModal = useModal();

  const handleDelete = async () => {
    const isConfirmed = await showModal({
      text: "Czy napewno chcesz usunąć ten plik ?",
      icon: "question",
      confirm: true,
    });
    if (isConfirmed) {
      deleteFile({ id, sortType, sortBy })
        .unwrap()
        .then(() => {
          showModal({ text: "Usunięto plik", icon: "success", confirm: false });
        })
        .catch((err) => {
          const message = err?.data?.message
            ? err.data.message
            : "Błąd przy rejestracji";
          showModal({ text: message, icon: "error", confirm: false });
        });
    }
  };

  const handleEditButtonClick = () => {
    editFileSidebar.setInitialData({ title, subject, fileId: id });
    editFileSidebar.setOpened(true);
  };

  const canEdit = authorName === login;

  const canDelete =
    authorName === login ||
    userType === UserType.admin ||
    userType === UserType.moderator;

  const handleSubjectClick = (subject: string) => () => {
    if (setSearchFilters) {
      setSearchFilters((prevState) => {
        if (prevState.subject === subject) {
          return { ...prevState, subject: "" };
        }
        return { ...prevState, subject };
      });
    }
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <AuthorLink to={`/users/${authorName}`}>Autor: {authorName} </AuthorLink>
      <Paragraph onClick={handleSubjectClick(subject)} clickable>
        Temat: {subject}
      </Paragraph>
      <Paragraph>
        Data Dodania: {dayjs(createdAt).format("DD/MM/YYYY")}
      </Paragraph>
      <ButtonsWrapper>
        <FileLink to={`/file/${slug}`}>Zobacz</FileLink>
        {canEdit && (
          <>
            <EditButton aria-label="Edit File" onClick={handleEditButtonClick}>
              <EditIcon />
            </EditButton>
          </>
        )}
        {canDelete && (
          <DeleteButton aria-label="Delete File" onClick={handleDelete}>
            <DeleteIcon />
          </DeleteButton>
        )}
      </ButtonsWrapper>
      <Paragraph>Rozmiar pliku: {readAbleFileSize(fileSize)}</Paragraph>
    </Wrapper>
  );
};

export default FileCard;
