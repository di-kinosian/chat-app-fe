import React, { useState } from "react";
import { Input } from "../Input/index.tsx";
import "./index.css";
import SearchIcon from "../IconsCollection/SearchIcon.tsx";
import CrossIcon from "../IconsCollection/CrossIcon.tsx";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <div className={`search-input-wrapper ${className}`}>
      <div className="icon-wrapper search-icon" onClick={handleSearch}>
        <SearchIcon size={20} />
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        clearable={false}
      />
      {inputValue && (
        <div className="icon-wrapper clear-icon" onClick={handleClear}>
          <CrossIcon size={20} />
        </div>
      )}
    </div>
  );
};
