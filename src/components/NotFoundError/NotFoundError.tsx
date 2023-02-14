import {
  ArchiveIcon,
  Circle,
  ErrorMessage,
  ErrorWrapper,
} from "./NotFoundError.styles";
import { FC } from "react";

interface Props {
  centered?: boolean;
}

const NotFoundError: FC<Props> = ({ children, centered }) => (
  <ErrorWrapper centered={centered}>
    <Circle>
      <ArchiveIcon />
    </Circle>
    <ErrorMessage>{children}</ErrorMessage>
  </ErrorWrapper>
);

export default NotFoundError;
