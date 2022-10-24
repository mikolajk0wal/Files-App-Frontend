import styled from "styled-components";
import { AddButton, AddIcon } from "../Nav/Nav.styles";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export const Title = styled.h3`
  font-size: 2rem;
  text-align: center;
  padding: 50px 0;
  font-weight: 600;
  color: ${({ theme }) => theme.contrastColor};
`;

interface FormProps {
  opened: boolean;
}

export const FormWrapper = styled.div<FormProps>`
  width: 400px;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};
  transition: 0.5s transform;
  @media (max-height: 600px) {
    height: 100vh;
    top: 0;
  }
  @media (max-width: 650px) {
    width: 100%;
    height: 100vh;
  }
  @media (max-width: 395px) {
    width: 100%;
    top: 0;
    height: 100vh;
  }
  ${(props) =>
    props.opened ? `transform: translate(0px)` : `transform:translate(200%)`}
`;

export const StyledInput = styled(Input)`
  margin: 20px;
  padding: 15px;
  min-width: 270px;
  @media (max-width: 570px) {
    width: 240px;
    box-sizing: border-box;
  }
`;

export const CloseButton = styled(AddButton)`
  @media (min-width: 650px) {
    display: none;
  }
  margin: 10px;
`;

export const EditCloseButton = styled(AddButton)`
  margin: 10px;
`;

export const CloseIcon = styled(AddIcon)`
  color: ${({ theme }) => theme.contrastColor};
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  border-radius: 20px;
`;
