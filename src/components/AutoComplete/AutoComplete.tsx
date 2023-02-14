import { StyledButton, StyledItem, StyledList } from "./AutoComplete.styles";

interface Props {
  items: { _id: string; title: string }[];
  onItemClick: (title: string) => void;
}

const AutoComplete: React.FC<Props> = ({ items, onItemClick }) => {
  return (
    <StyledList>
      {items.map((item) => (
        <StyledItem key={item._id}>
          <StyledButton onClick={() => onItemClick(item.title)}>
            {item.title}
          </StyledButton>
        </StyledItem>
      ))}
    </StyledList>
  );
};

export default AutoComplete;
