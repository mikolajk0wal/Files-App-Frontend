import styled from "styled-components";

export const CommentInputWrapper = styled.section`
  width: 90%;
  max-width: 1200px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CommentInput = styled.input`
  align-self: flex-start;
  background-color: transparent;
  border: 4px solid ${({ theme }) => theme.contrastColor};
  border-radius: 20px;
  width: 75%;
  padding: 40px 10px;
  color: ${({ theme }) => theme.contrastColor};
  font-size: 1.5rem;
  @media (max-width: 850px) {
    align-self: center;
  }
`;

export const ResponseInfo = styled.p`
  align-self: flex-start;
  padding: 10px;
  color: ${({ theme }) => theme.contrastColor};
  @media (max-width: 850px) {
    align-self: center;
  }
`;

export const AddWrapper = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

export const AddCommentButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 20px;
  background-color: #48cae4;
  padding: 45px 55px;
  margin-left: 15px;
  color: ${({ theme }) => theme.contrastColor};
  font-weight: 600;
  font-size: 1.5rem;
  @media (max-width: 850px) {
    margin-left: 0;
    margin-top: 15px;
  }
`;

export const CommentsWrapper = styled.section``;

export const CommentWrapper = styled.article`
  background-color: transparent;
  border: 4px solid ${({ theme }) => theme.contrastColor};
  border-radius: 20px;
  width: 75%;
  padding: 40px 10px;
  color: ${({ theme }) => theme.contrastColor};
  font-size: 1.5rem;
`;
