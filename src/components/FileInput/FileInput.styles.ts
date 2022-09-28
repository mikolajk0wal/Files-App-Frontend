import styled from "styled-components";

export const StyledFileInput = styled.input`
  color: ${({ theme }) => theme.primaryColor};
  position: relative;

  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    box-sizing: content-box;
    content: "Załącz plik";
    display: flex;
    width: 200px;
    margin: 30px 10px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 600;
    border-radius: 15px;
    white-space: nowrap;
    border: 2px solid transparent;
    -webkit-user-select: none;
    transition: 0.3s background-color, color, border-color;
    cursor: pointer;
    color: ${({ theme }) => theme.primaryColor};
    background-color: ${({ theme }) => theme.contrastColor};
  }
`;

export const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 5px 15px 10px;
  padding: 0 15px;
  text-align: center;
  color: ${({ theme }) => theme.contrastColor};
`;
