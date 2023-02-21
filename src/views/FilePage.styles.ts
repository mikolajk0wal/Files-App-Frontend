import styled, { css } from "styled-components";
import { VscFilePdf } from "react-icons/vsc";
import { MdImage } from "react-icons/md";
import { AiFillFolder } from "react-icons/ai";

interface IconProps {
  alt: string;
}

const IconStyles = css`
  color: ${({ theme }) => theme.contrastColor};
  background-color: transparent;
  width: 270px;
  height: 270px;
  @media (max-width: 650px) {
    width: 60px;
    height: 60px;
    border-radius: 13.5px;
    margin: 5px;
  }
  @media (max-width: 530px) {
    width: 50px;
    height: 50px;
    border-radius: 12px;
  }
`;

export const Wrapper = styled.section`
  display: flex;
  margin: 70px;
  //align-self: flex-start;
`;
export const InfoWrapper = styled.section``;

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
  font-size: 2.75rem;
  color: ${({ theme }) => theme.contrastColor};
`;

export const Paragraph = styled.p`
  font-size: 1.5rem;
  margin: 10px 5px;
  font-weight: 500;
  color: ${({ theme }) => theme.contrastColor};
`;
