import styled from 'styled-components';

export const Wrapper = styled.main`
  margin-left: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1500px) {
    margin-left: 135px;
  }
  @media (max-width: 650px) {
    margin: 0;
    margin-top: 100px;
  }
`;
