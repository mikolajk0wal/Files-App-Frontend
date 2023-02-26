import { CommentWrapper } from "./Comments.styles";
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
      <p>{authorName}</p>
      <p>{dayjs(createdAt).format("DD/MM/YYYY hh:mm")}</p>
      <p>{message}</p>
      <button>Odpowiedz</button>
    </CommentWrapper>
  );
};

export default Comment;
