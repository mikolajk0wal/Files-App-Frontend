import { PaginationItem, Wrapper } from "./PaginationBar.styles";
import { generatePaginationItems } from "../../utils/generatePaginationItems";

//@TODO Paginacja (Po kliknięciu na guzik, zmieniam searchDTO ustawiając stronę i rtk refetchuje i chita działa B))))) )

interface Props {
  requiredPages: number;
  currentPage?: number;
  handlePageChange: (page: number) => void;
}

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
