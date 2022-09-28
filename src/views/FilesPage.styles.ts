import styled from "styled-components";
import { IoIosArchive } from "react-icons/io";

export const FilesType = styled.h1`
  font-size: 2rem;
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.contrastColor};
  margin-top: 110px;
  @media (max-width: 1472px) {
    margin-top: 185px;
  }

  @media (max-width: 1150px) {
    margin-top: 30px;
  }
  @media (max-width: 430px) {
    margin-top: 100px;
  }
`;

export const ErrorWrapper = styled.section`
  color: ${({ theme }) => theme.contrastColor};
  position: absolute;
  top: 40%;
  left: calc(50% + 80px);
  padding: 30px;
  transform: translate(-50%, -50%);
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
