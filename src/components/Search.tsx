import React, { ChangeEvent, FC, useState } from 'react';

interface SearchProps {
  onSearch: (value: string) => void;
}

export const Search: FC<SearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>();

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);

  const handleSearch = () => onSearch(searchValue!);
  const isSearchDisable = Boolean(!searchValue || searchValue?.length < 3);

  return <span>
    <input name="search" onChange={handleChangeValue} placeholder="Search your film"/>
    <button name="search button" onClick={handleSearch} disabled={isSearchDisable}>Search</button>
  </span>;
};
