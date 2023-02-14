import styled from "styled-components";
import { IoIosArchive } from "react-icons/io";

interface Props {
  centered?: boolean;
}

export const ErrorWrapper = styled.section<Props>`
  color: ${({ theme }) => theme.contrastColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ centered }) =>
    centered
      ? "  position: absolute;  top: 50%;  left: calc(50% + 80px);  transform: translate(-50%, -50%);"
      : ""}

  padding: 30px;
  @media (max-width: 650px) {
    left: 50%;
  }
`;

export const ErrorMessage = styled.h1`
  margin-top: 30px;
  color: ${({ theme }) => theme.contrastColor};
  text-align: center;
`;

export const Circle = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ArchiveIcon = styled(IoIosArchive)`
  width: 150px;
  height: 150px;
  color: #d3d9dd;
`;
