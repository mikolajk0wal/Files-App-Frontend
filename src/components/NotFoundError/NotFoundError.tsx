import {
  ArchiveIcon,
  Circle,
  ErrorMessage,
  ErrorWrapper,
} from "./NotFoundError.styles";

interface Props {
  centered?: boolean;
}

const NotFoundError: React.FC<Props> = ({ children, centered }) => (
  <ErrorWrapper centered={centered}>
    <Circle>
      <ArchiveIcon />
    </Circle>
    <ErrorMessage>{children}</ErrorMessage>
  </ErrorWrapper>
);

export default NotFoundError;
