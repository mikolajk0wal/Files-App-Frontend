import styled from "styled-components";

export const StyledList = styled.ul`
  position: absolute;
  z-index: 10;
  top: 100%;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  list-style-type: none;
`;

export const StyledItem = styled.li`
  width: 100%;
  margin-top: 2px;
  &:hover > button {
    background-color: ${({ theme }) => theme.autocompleteHoveredBackground};
    color: ${({ theme }) => theme.primaryColor};
  }
  &:first-child > button {
    border-radius: 10px 10px 0 0;
  }
  &:last-child > button {
    border-radius: 0 0 10px 10px;
  }
`;
export const StyledButton = styled.button`
  color: ${({ theme }) => theme.contrastColor};
  &:focus {
    background-color: ${({ theme }) => theme.autocompleteHoveredBackground};
    color: ${({ theme }) => theme.primaryColor};
  }
  transition: color, background-color 0.4s;
  background-color: ${({ theme }) => theme.autocompleteBackground};
  border: none;
  width: 100%;
  cursor: pointer;
  padding: 10px 20px;
  font-weight: 600;
`;
