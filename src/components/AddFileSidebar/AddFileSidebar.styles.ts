import styled from 'styled-components';
import { AddButton, AddIcon } from '../Nav/Nav.styles';

export const Title = styled.h3`
  font-size: 2rem;
  color: #fff;
  text-align: center;
  padding: 50px 0;
  font-weight: 600;
`;

interface FormProps {
  opened: boolean;
}

export const FormWrapper = styled.div<FormProps>`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #20253b;
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
    props.opened ? `transform: translate(0px)` : `transform:translate(100%)`}
`;

export const StyledInput = styled.input`
  color: #14213d;
  font-size: 1.2rem;
  border: none;
  outline: none;
  margin: 20px;
  border-radius: 13px;
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
export const CloseIcon = styled(AddIcon)`
  color: #fff;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const selectStyles = {
  menu: (provided: any, state: any) => ({
    ...provided,
    minWidth: 270,
    fontSize: '1.2rem',
    borderBottom: '1px dotted pink',
    color: '#000',
    cursort: 'pointer',
    padding: 10,
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    width: 270,
    margin: '20px 0 30px',
    fontSize: '1.2rem',
    borderRadius: 15,
    padding: '5px 10px',
  }),
};
