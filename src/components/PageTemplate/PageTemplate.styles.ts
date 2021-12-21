import styled from 'styled-components';

interface Props {
  isDashboard: boolean;
}

export const Wrapper = styled.main<Props>`
  margin-left: ${({ isDashboard }) => (isDashboard ? '300px' : '160px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1500px) {
    margin-left: ${({ isDashboard }) => (isDashboard ? '300px' : '135px')};
  }
  @media (max-width: 650px) {
    margin: 0;
    margin-top: 100px;
  }
`;
