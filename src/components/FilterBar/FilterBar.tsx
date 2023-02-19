import {
  Wrapper,
  FilterWrapper,
  SearchIcon,
  SearchInput,
  SubjectIcon,
  SearchWrapper,
  SearchButton,
  AuthorIcon,
  CalendarIcon,
  StorageIcon,
} from "./FilterBar.styles";

import Checkbox from "../Checkbox/Checkbox";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { UIContext } from "../../context/UIContext";
import { SearchFilters } from "../FilesDisplay/FilesDisplay";
import { isDashboard } from "../../utils/isDashboard";
import axios from "axios";
import AutoComplete from "../AutoComplete/AutoComplete";
import { useParams } from "react-router-dom";
import { FileType } from "../../types/FileType";
import Switch from "react-switch";
import { MoonIcon, SunIcon } from "../Nav/Nav.styles";
import { AiFillCalendar, MdSdStorage } from "react-icons/all";

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
  const { author, sortType, subject, title, sortBy } = searchFilters;
  const { filterBarOpened } = useContext(UIContext);

  const createdAtSortLabel = {
    desc: "Od najnowszych",
    asc: "Od najstarszych",
  };

  const fileSizeSortLabel = {
    desc: "Od najcięższych",
    asc: "Od najlżejszych",
  };

  const [autoComplete, setAutoComplete] = useState<
    { _id: string; title: string }[]
  >([]);

  const handleSortTypeCheckboxClick = () => {
    setSearchFilters((prevState: SearchFilters) => ({
      ...prevState,
      sortType: prevState.sortType === "asc" ? "desc" : "asc",
    }));
  };

  const handleSortByCheckboxClick = () => {
    setSearchFilters((prevState: SearchFilters) => ({
      ...prevState,
      sortBy: prevState.sortBy === "createdAt" ? "fileSize" : "createdAt",
    }));
  };

  useEffect(() => {
    (async () => {
      if (title && title?.length > 2) {
        try {
          const url = new URL(window.location.href);

          if (login) {
            url.searchParams.set("authorName", login);
          } else {
            const fileType = dashboard
              ? (url.pathname.slice(11) as FileType)
              : (url.pathname.slice(1) as FileType);
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
    })();
  }, [title]);

  const handleTitleChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
        <Switch
          checked={sortBy === "createdAt"}
          onChange={handleSortByCheckboxClick}
          checkedIcon={<CalendarIcon />}
          uncheckedIcon={<StorageIcon />}
          offColor="#faf"
        />
        <Checkbox
          label={
            sortBy === "createdAt"
              ? createdAtSortLabel[sortType]
              : fileSizeSortLabel[sortType]
          }
          id="sort"
          name="sort"
          checked={sortType === "desc"}
          onChange={handleSortTypeCheckboxClick}
        />

        <SearchButton type="submit" dashboard={dashboard}>
          Search
        </SearchButton>
      </SearchWrapper>
    </Wrapper>
  );
};

export default FilterBar;
