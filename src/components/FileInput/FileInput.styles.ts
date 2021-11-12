import styled from 'styled-components';

export const StyledFileInput = styled.input`
  color: #20253b;
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    content: 'Załącz plik';
    display: flex;
    width: 200px;
    margin: 10px;
    height: 40px;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 600;
    color: #efe6e7;
    background-color: #c14c55;
    border-radius: 15px;
    white-space: nowrap;
    -webkit-user-select: none;
    transition: 0.3s color, background-color;
    cursor: pointer;
    &:hover,
    &:focus {
      color: #c14c55;
      background-color: #efe6e7;
    }
  }
`;

export const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 5px 15px 10px;
  padding: 0 15px;
  text-align: center;
  color: #fff;
`;
