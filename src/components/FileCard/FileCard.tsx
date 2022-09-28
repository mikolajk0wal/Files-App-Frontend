import React, { useContext } from "react";
import dayjs from "dayjs";
import { FileType } from "../../types/FileType";
import {
  ButtonsWrapper,
  DeleteButton,
  DeleteIcon,
  DownloadButton,
  Paragraph,
  Title,
  Wrapper,
  EditButton,
  EditIcon,
} from "./FileCard.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useModal from "../../hooks/useModal";
import { useDeleteFileMutation } from "../../services/files";
import { UIContext } from "../../context/UIContext";
import { UserType } from "../../enums/UserType";
import { SearchFilters } from "../../views/FilesPage";

interface Props {
  title: string;
  authorName: string;
  subject: string;
  type: FileType;
  createdAt: string;
  id: string;
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
}) => {
  const { sortType, editFileSidebar } = useContext(UIContext);
  const [deleteFile] = useDeleteFileMutation();
  const { login, type: userType } = useSelector(
    (state: RootState) => state.auth
  );
  const showModal = useModal();

  const handleDelete = async () => {
    const isConfirmed = await showModal(
      "Czy napewno chcesz usunąć ten plik ?",
      "question",
      true
    );
    if (isConfirmed) {
      deleteFile({ id, sortType })
        .unwrap()
        .then(() => {
          showModal("Usunięto plik", "success", false);
        })
        .catch((err) => {
          const message = err?.data?.message
            ? err.data.message
            : "Błąd przy rejestracji";
          showModal(message, "error", false);
        });
    }
  };

  const handleEditButtonClick = () => {
    editFileSidebar.setInitialData({ title, subject, fileId: id });
    editFileSidebar.setOpened(true);
  };

  const canDelete =
    authorName === login ||
    userType === UserType.admin ||
    userType === UserType.moderator;

  const handleAuthorClick = (author: string) => () => {
    if (setSearchFilters) {
      setSearchFilters((prevState) => {
        if (prevState.author === author) {
          return { ...prevState, author: "" };
        }
        return { ...prevState, author };
      });
    }
  };

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
      <Paragraph onClick={handleAuthorClick(authorName)} clickable>
        Autor: {authorName}
      </Paragraph>
      <Paragraph onClick={handleSubjectClick(subject)} clickable>
        Temat: {subject}
      </Paragraph>
      <Paragraph>
        Data Dodania: {dayjs(createdAt).format("DD/MM/YYYY")}
      </Paragraph>
      <ButtonsWrapper>
        <DownloadButton
          as="a"
          href={
            process.env.NODE_ENV === "development"
              ? `http://localhost:8000/api/files/file/${id}`
              : `${document.location.origin}/api/files/file/${id}`
          }
        >
          Pobierz
        </DownloadButton>
        {canDelete && (
          <>
            <DeleteButton aria-label="Delete File" onClick={handleDelete}>
              <DeleteIcon />
            </DeleteButton>
            <EditButton aria-label="Edit File" onClick={handleEditButtonClick}>
              <EditIcon />
            </EditButton>
          </>
        )}
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default FileCard;
