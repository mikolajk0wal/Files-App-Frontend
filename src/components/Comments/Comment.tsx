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

interface Props {
  authorName: string;
  createdAt: string;
  message: string;
  parentId?: string;
}

const Comment: FC<Props> = ({ createdAt, authorName, parentId, message }) => {
  const { login, type: userType } = useSelector(
    (state: RootState) => state.auth
  );

  const checkIfCanDelete = useCallback(
    (name: string | null, type: UserType | null) => {
      return (name === authorName || type !== UserType.normal) && name;
    },
    [authorName]
  );

  return (
    <CommentWrapper>
      <AuthorInfo>{authorName}</AuthorInfo>
      <DateInfo>{dayjs(createdAt).format("DD/MM/YYYY HH:mm")}</DateInfo>
      <Message>{message}</Message>
      {checkIfCanDelete(login, userType) && <RemoveButton>Usuń</RemoveButton>}
    </CommentWrapper>
  );
};

export default Comment;
