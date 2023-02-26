import { CommentWrapper } from "./Comments.styles";
import { FC } from "react";

interface Props {
  authorName: string;
  createdAt: string;
  message: string;
  parentId?: string;
}

const Comment: FC<Props> = () => {
  return (
    <CommentWrapper>
      <h1>res</h1>
    </CommentWrapper>
  );
};

export default Comment;
