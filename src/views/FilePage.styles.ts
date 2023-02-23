import styled, { css } from "styled-components";
import { VscFilePdf } from "react-icons/vsc";
import { MdImage } from "react-icons/md";
import { AiFillFolder } from "react-icons/ai";
import { Button } from "../components/Button/Button";

interface IconProps {
  alt: string;
}

const IconStyles = css`
  color: ${({ theme }) => theme.contrastColor};
  background-color: transparent;
  width: 270px;
  height: 270px;

  @media (max-width: 1050px) {
    width: 150px;
    height: 150px;
  } ;
`;

export const FileWrapper = styled.section`
  display: flex;
  margin: 70px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
export const InfoWrapper = styled.section``;

export const CommentsWrapper = styled.section`
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

export const ButtonsWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PdfIcon = styled(VscFilePdf)<IconProps>`
  ${IconStyles}
`;

export const ImgIcon = styled(MdImage)<IconProps>`
  ${IconStyles}
`;

export const OtherIcon = styled(AiFillFolder)<IconProps>`
  ${IconStyles}
`;

export const Title = styled.h1`
  font-weight: 600;
  text-align: center;
  font-size: 2.75rem;
  color: ${({ theme }) => theme.contrastColor};
  @media (max-width: 1050px) {
    font-size: 2rem;
  } ;
`;

export const Paragraph = styled.p`
  font-size: 1.5rem;
  margin: 10px 5px;
  font-weight: 500;

  color: ${({ theme }) => theme.contrastColor};
  @media (max-width: 1050px) {
    font-size: 1.25rem;
  } ;
`;

const buttonStyles = css`
  text-decoration: none;
  border-radius: 40px;
  margin: 10px;
  min-width: 230px;
`;

export const DownloadButton = styled(Button)`
  ${buttonStyles}
`;

export const EditButton = styled(Button)`
  background-color: #faff00;
  color: #000;
  ${buttonStyles}
`;

export const DeleteButton = styled(Button)`
  background-color: #ff0f00;
  color: #fff;
  ${buttonStyles}
`;
