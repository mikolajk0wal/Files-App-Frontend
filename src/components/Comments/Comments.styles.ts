import styled, { css } from "styled-components";
import { Button } from "../Button/Button";

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

export const CommentsWrapper = styled.section`
  width: 100%;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CommentWrapper = styled.article`
  background-color: transparent;
  position: relative;
  margin-top: 20px;
  border: 4px solid ${({ theme }) => theme.contrastColor};
  border-radius: 20px;
  width: 75%;
  padding: 40px 10px;
  color: ${({ theme }) => theme.contrastColor};
  font-size: 1.5rem;
`;

const absoluteInfoStyles = css`
  position: absolute;
  top: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.contrastColor};
`;

export const AuthorInfo = styled.p`
  ${absoluteInfoStyles};
  left: 10px;
`;

export const DateInfo = styled.p`
  ${absoluteInfoStyles};
  right: 10px;
`;

export const Message = styled.p`
  font-size: 1.2rem;
`;

export const ReplyButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 1.2rem;
  border-radius: 10px;
  background-color: #5c63db;
  color: ${({ theme }) => theme.contrastColor};
`;
