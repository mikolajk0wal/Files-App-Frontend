import { PaginationItem, Wrapper } from "./PaginationBar.styles";
import { generatePaginationItems } from "../../utils/generatePaginationItems";

interface Props {
  requiredPages: number;
  currentPage?: number;
  handlePageChange: (page: number) => void;
}
//@TODO JAK Z 2 strony pdf cche na other to na 2 strone przelacza na ktorej nie ma plikow
const PaginationBar: React.FC<Props> = ({
  requiredPages,
  handlePageChange,
  currentPage = 1,
}) => {
  const paginationItems = generatePaginationItems(requiredPages, currentPage);
  return (
    <Wrapper>
      {paginationItems.map((item) => (
        <PaginationItem
          key={item}
          active={item === currentPage}
          onClick={() => {
            if (typeof item === "number") {
              handlePageChange(item);
            } else if (item === "<") {
              handlePageChange(currentPage - 1);
            } else if (item === ">") {
              handlePageChange(currentPage + 1);
            }
          }}
        >
          {item}
        </PaginationItem>
      ))}
    </Wrapper>
  );
};

export default PaginationBar;
