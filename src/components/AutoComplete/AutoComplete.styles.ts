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
  margin-top: 3px;
  // border-bottom: 1px solid ${({ theme }) => theme.primaryColor};
`;
export const StyledButton = styled.button`
  color: ${({ theme }) => theme.contrastColor};
  background-color: #5c6;
  border: none;
  width: 100%;
  cursor: pointer;
  padding: 10px 20px;
  font-weight: 600;
`;
