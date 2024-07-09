import React from "react";
import "../CSS/SearchBar.css";
import magnifyingGlass from "../Assests/Images/mag-glass.png";
import { useState } from "react";

const SearchBar = ({ onSearch, onTypeChange }) => {
  const [query, setQuery] = useState(" ");

  return (
    <div className="search-bar">
      <div className="search-button">
        <button className="drop-btn">Lemma</button>
        <div className="dropdown-content">
          <p onClick = {() => onTypeChange("search")}>Lemma</p>
          <p onClick = {() => onTypeChange("pdf")}>Document</p>
        </div>
      </div>
      <div className="search-input">
        <input
          placeholder="Please enter the word"
          type="text"
          onChange={(event) => {
            let val = event.target.value;

            setQuery(val);
          }}
          value={query}
        />
      </div>
      <div className="search-icon">
        <img
          src={magnifyingGlass}
          id="magnifying-glass"
          alt="magnifying glass"
          onClick={() => {
            onSearch(query);
            setQuery("");
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
