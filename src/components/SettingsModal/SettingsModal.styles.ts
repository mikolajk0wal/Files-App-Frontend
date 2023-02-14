import styled from "styled-components";
import { AddButton, AddIcon } from "../Nav/Nav.styles";
import { Input } from "../Input/Input";
import { SubmitButton } from "../AuthForms/AuthForms.styles";

interface Props {
  opened: boolean;
}

export const Backdrop = styled.div<Props>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;
  transition: 0.5s transform;
  transform: translateX(${({ opened }) => (opened ? "0" : "-110%")});
`;

export const Wrapper = styled.section`
  width: 90vw;
  max-width: 900px;
  border-radius: 50px;
  min-height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.primaryColor};
  @media (max-width: 730px) {
    min-height: 450px;
  } ;
`;

export const PropertyWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

interface ChangingInfoProps {
  active?: boolean;
}

export const ChangingProperty = styled.button<ChangingInfoProps>`
  border: none;
  background-color: transparent;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  font-size: ${({ active }) => (active ? "40px" : "24px")};
  font-weight: 700;
  margin: 20px;
  color: ${({ theme }) => theme.contrastColor};
  @media (max-width: 730px) {
    margin: 10px;
    font-size: ${({ active }) => (active ? "30px" : "16px")};
  } ;
`;

export const CloseButton = styled(AddButton)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const CloseIcon = styled(AddIcon)`
  color: ${({ theme }) => theme.contrastColor};
  @media (max-width: 650px) {
    width: 70px;
    height: 70px;
    border-radius: 16px;
    margin: 0;
  }
  @media (max-width: 530px) {
    width: 70px;
    height: 70px;
    border-radius: 16px;
    margin: 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledButton = styled(SubmitButton)`
  margin: 20px;
  border-radius: 15px;
  padding: 10px 50px;
`;

export const StyledInput = styled(Input)`
  @media (max-width: 430px) {
    width: 80 %;
  } ;
`;
