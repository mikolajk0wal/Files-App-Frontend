import Comment from "./Comment";
import { Comment as CommentInterface } from "../../services/comments";
import { CommentsWrapper } from "./Comments.styles";
import { FC, useMemo } from "react";

interface Props {
  comments: CommentInterface[];
}

const CommentsList: FC<Props> = ({ comments }) => {
  return (
    <CommentsWrapper>
      {comments.map(({ _id, authorName, createdAt, message }) => (
        <Comment
          key={_id}
          authorName={authorName}
          createdAt={createdAt}
          message={message}
        />
      ))}
    </CommentsWrapper>
  );
};

export default CommentsList;
