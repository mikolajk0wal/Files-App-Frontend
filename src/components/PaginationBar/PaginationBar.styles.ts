import styled from "styled-components";

export const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.primaryColor};
  display: flex;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);

  margin: 20px auto;
  width: 75%;
  max-width: 500px;
  align-items: center;
  padding: 20px 0;
  border-radius: 50px;
  justify-content: center;
`;

interface Props {
  active?: boolean;
}

export const PaginationItem = styled.button<Props>`
  background-color: ${({ active, theme }) =>
    active ? "#5c63db" : theme.primaryColor};
  color: ${({ active }) => (active ? "#fff" : "#5c63db")};
  font-family: "Montserrat", sans-serif;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 50%;
  font-weight: 600;
`;
