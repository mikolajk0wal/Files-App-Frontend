import { CommentWrapper } from "./Comments.styles";

interface Props {
  authorName: string;
  createdAt: string;
  message: string;
  parentId?: string;
}

const Comment = () => {
  return (
    <CommentWrapper>
      <h1>res</h1>
    </CommentWrapper>
  );
};

export default Comment;
