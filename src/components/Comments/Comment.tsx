import {
  AuthorInfo,
  CommentWrapper,
  DateInfo,
  Message,
  ReplyButton,
} from "./Comments.styles";
import { FC } from "react";
import dayjs from "dayjs";

interface Props {
  authorName: string;
  createdAt: string;
  message: string;
  parentId?: string;
}

const Comment: FC<Props> = ({ createdAt, authorName, parentId, message }) => {
  return (
    <CommentWrapper>
      <AuthorInfo>{authorName}</AuthorInfo>
      <DateInfo>{dayjs(createdAt).format("DD/MM/YYYY hh:mm")}</DateInfo>
      <Message>{message}</Message>
      <ReplyButton>Odpowiedz</ReplyButton>
    </CommentWrapper>
  );
};

export default Comment;
