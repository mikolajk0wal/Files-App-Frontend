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
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { UIContext } from "../../context/UIContext";
import { SearchFilters } from "../../views/FilesPage";
import { isDashboard } from "../../utils/isDashboard";
import axios from "axios";
import AutoComplete from "../AutoComplete/AutoComplete";
import { useParams } from "react-router-dom";
import { FileType } from "../../types/FileType";

interface Props {
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  handleFormSubmit: (title?: string) => void;
}

const FilterBar: React.FC<Props> = ({
  searchFilters,
  setSearchFilters,
  handleFormSubmit,
}) => {
  const dashboard = isDashboard();
  const { login } = useParams() as any;
  const { author, sortType, subject, title } = searchFilters;
  const { filterBarOpened } = useContext(UIContext);

  const [autoComplete, setAutoComplete] = useState<
    { _id: string; title: string }[]
  >([]);

  const handleCheckboxClick = () => {
    setSearchFilters((prevState: SearchFilters) => ({
      ...prevState,
      sortType: prevState.sortType === "asc" ? "desc" : "asc",
    }));
  };

  const handleTitleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (title && title?.length > 2) {
      try {
        const url = new URL(window.location.href);
        const fileType = dashboard
          ? (url.pathname.slice(11) as FileType)
          : (url.pathname.slice(1) as FileType);
        if (login) {
          url.searchParams.set("authorName", login);
        } else if (fileType) {
          url.searchParams.set("type", fileType);
        }
        const isDevEnv = process.env.NODE_ENV === "development";
        const { data } = await axios.get(
          `${
            isDevEnv ? "http://localhost:8000" : ""
          }/api/files/autocomplete/${title}${url.search}`
        );
        setAutoComplete(data);
      } catch (e) {
        setAutoComplete([]);
      }
    } else {
      setAutoComplete([]);
    }
    setSearchFilters((prevState: SearchFilters) => ({
      ...prevState,
      title,
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

  const handleAutoCompleteItemSelect = (title: string) => {
    setSearchFilters((prevState: SearchFilters) => ({
      ...prevState,
      title,
    }));
    handleFormSubmit(title);
    setAutoComplete([]);
  };

  return (
    <Wrapper
      onSubmit={(e: any) => {
        e.preventDefault();
        handleFormSubmit();
      }}
      opened={filterBarOpened}
      dashboard={dashboard}
    >
      <FilterWrapper>
        <label htmlFor="title">
          <SearchIcon />
        </label>
        <div style={{ position: "relative" }}>
          <SearchInput
            placeholder="Tytuł"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          {!!autoComplete.length && (
            <AutoComplete
              items={autoComplete}
              onItemClick={handleAutoCompleteItemSelect}
            />
          )}
        </div>
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
