import styled from "styled-components";

export const FilesType = styled.h1<{ dashboard?: boolean }>`
  font-size: 2rem;
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.contrastColor};
  margin-top: 110px;
  @media (max-width: ${({ dashboard }) => (dashboard ? "1665px" : "1472px")}) {
    margin-top: 185px;
  }

  @media (max-width: 1150px) {
    margin-top: 30px;
  }
  @media (max-width: 430px) {
    margin-top: 100px;
  }
`;
