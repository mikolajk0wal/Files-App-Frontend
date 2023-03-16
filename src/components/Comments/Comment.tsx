import {
  AuthorInfo,
  CommentWrapper,
  DateInfo,
  Message,
  RemoveButton,
} from "./Comments.styles";
import { FC, useCallback } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserType } from "../../enums/UserType";
import { useRemoveCommentMutation } from "../../services/comments";
import useModal from "../../hooks/useModal";

interface Props {
  authorName: string;
  createdAt: string;
  message: string;
  _id: string;
  parentId?: string;
}

const Comment: FC<Props> = ({ createdAt, authorName, message, _id }) => {
  const { login, type: userType } = useSelector(
    (state: RootState) => state.auth
  );
  const showModal = useModal();

  const [removeComment] = useRemoveCommentMutation();

  const checkIfCanDelete = useCallback(
    (name: string | null, type: UserType | null) => {
      return (name === authorName || type !== UserType.normal) && name;
    },
    [authorName]
  );

  const handleRemoveButtonClick = async () => {
    const isConfirmed = await showModal({
      text: "Czy napewno chcesz usunąć komentarz?",
      icon: "question",
      confirm: true,
    });
    if (isConfirmed) {
      removeComment(_id)
        .unwrap()
        .then(() => {
          showModal({
            text: "Usunięto komentarz",
            icon: "success",
            confirm: false,
          });
        })
        .catch((err) => {
          const message = err?.data?.message
            ? err.data.message
            : "Błąd przy usuwaniu komentarza";
          showModal({ text: message, icon: "error", confirm: false });
        });
    }
  };

  return (
    <CommentWrapper>
      <AuthorInfo>{authorName}</AuthorInfo>
      <DateInfo>{dayjs(createdAt).format("DD/MM/YYYY HH:mm")}</DateInfo>
      <Message>{message}</Message>
      {checkIfCanDelete(login, userType) && (
        <RemoveButton onClick={handleRemoveButtonClick}>Usuń</RemoveButton>
      )}
    </CommentWrapper>
  );
};

export default Comment;
