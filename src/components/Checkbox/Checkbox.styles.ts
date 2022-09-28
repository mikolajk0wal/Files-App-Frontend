import styled from "styled-components";

export const Label = styled.label`
  font-weight: 700;
  font-size: 22px;
  color: ${({ theme }) => theme.contrastColor};
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media (max-width: 1570px) {
    font-size: 18px;
  } ;
`;

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 1px;
  width: 1px;
  &:checked ~ span {
    background-color: #5c63db;
  }
  &:checked ~ span::after {
    display: block;
  }
`;

export const CheckMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #e8e8ea;
  &::after {
    content: "";
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 7px;
    height: 13px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
