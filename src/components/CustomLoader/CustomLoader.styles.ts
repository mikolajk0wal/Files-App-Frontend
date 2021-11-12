import styled from 'styled-components';
import { AiOutlineClockCircle } from 'react-icons/ai';

export const LoaderWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ClockIcon = styled(AiOutlineClockCircle)`
  font-size: 6rem;
`;

export const HeaderInfo = styled.h3`
  font-size: 2rem;
  padding: 10px;
  text-align: center;
`;
export const ParagraphInfo = styled.p`
  font-size: 1.3rem;
  text-align: center;
`;
