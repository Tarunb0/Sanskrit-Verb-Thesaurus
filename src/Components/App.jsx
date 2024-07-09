import React from "react";
import "../CSS/App.css";
import Header from "./Header";
import SearchBar from "./Search";
import List from "./List";
import fetchData from "../Data/FetchData";
import { useState } from "react";
import Upload from "./Upload";

const App = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [queryType, setQueryType] = useState("search")

  const getResults = (word) => {
    fetchData(word)
      .then((fetchedData) => {
        setFetchedData(fetchedData);
        setSearched(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSearched(true);
      })
  };

  const handleTypeChange = (type) => {
    setQueryType(type);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <Header />
        </div>
        <div className="search">
          <SearchBar onSearch={getResults} onTypeChange={handleTypeChange}/>
        </div>
        <div className="search-results">
        {queryType === "search" ?  <List queryResult={fetchedData} searched = {searched}/> : <Upload />}
        </div>
      </div>
    </div>
  );
};

export default App;
