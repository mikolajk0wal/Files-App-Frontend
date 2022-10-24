import {
  Wrapper,
  FilterWrapper,
  SearchIcon,
  SearchInput,
  SubjectIcon,
  SearchWrapper,
  SearchButton,
  AuthorIcon,
} from "./FilterBar.styles";

import Checkbox from "../Checkbox/Checkbox";
import { ChangeEvent, useContext } from "react";
import { UIContext } from "../../context/UIContext";
import { SearchFilters } from "../../views/FilesPage";
import { isDashboard } from "../../utils/isDashboard";

interface Props {
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  handleFormSubmit: (e: any) => void;
}

const FilterBar: React.FC<Props> = ({
  searchFilters,
  setSearchFilters,
  handleFormSubmit,
}) => {
  const dashboard = isDashboard();
  const { author, sortType, subject, title } = searchFilters;
  const { filterBarOpened } = useContext(UIContext);
  const handleCheckboxClick = () => {
    setSearchFilters((prevState: SearchFilters) => ({
      ...prevState,
      sortType: prevState.sortType === "asc" ? "desc" : "asc",
    }));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFilters((prevState: SearchFilters) => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFilters((prevState: SearchFilters) => ({
      ...prevState,
      author: e.target.value,
    }));
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFilters((prevState: SearchFilters) => ({
      ...prevState,
      subject: e.target.value,
    }));
  };

  return (
    <Wrapper
      onSubmit={handleFormSubmit}
      opened={filterBarOpened}
      dashboard={dashboard}
    >
      <FilterWrapper>
        <label htmlFor="title">
          <SearchIcon />
        </label>
        <SearchInput
          placeholder="Tytuł"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </FilterWrapper>

      <FilterWrapper>
        <label htmlFor="subject">
          <SubjectIcon />
        </label>
        <SearchInput
          placeholder="Temat"
          id="subject"
          name="subject"
          value={subject}
          onChange={handleSubjectChange}
        />
      </FilterWrapper>

      <FilterWrapper>
        <label htmlFor="subject">
          <AuthorIcon />
        </label>
        <SearchInput
          placeholder="Autor"
          id="author"
          name="author"
          value={author}
          onChange={handleAuthorChange}
        />
      </FilterWrapper>

      <SearchWrapper>
        <Checkbox
          label="Od najnowszych"
          id="sort"
          name="sort"
          checked={sortType === "desc"}
          onChange={handleCheckboxClick}
        />

        <SearchButton type="submit" dashboard={dashboard}>
          Search
        </SearchButton>
      </SearchWrapper>
    </Wrapper>
  );
};

export default FilterBar;
