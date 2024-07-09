import React from "react";
import "../CSS/List.css";
// import searchResults from "../Data/searchResults";
import ListItem from "./ListItem";

export const List = ({ queryResult, searched }) => {
  console.log(queryResult);
  if (!searched) {
    return (
      <div className="list-space">
        <h2 style={{ textAlign: "center" }}>Please enter your query</h2>
      </div>
    );
  }
  if (queryResult.length === 0 && searched) {
    return (
      <div className="list-space">
        <h2 style={{ textAlign: "center", color: "red" }}>
          There were no results for your query
        </h2>
      </div>
    );
  }
  return (
    <div className="list-space">
      <div className="list">
        {/* {searchResults.map((item) => (
          <ListItem
            key={item.id}
            lemma={item.lemma}
            meaning={item.english_meaning}
          />
        ))} */}
        {queryResult.map((item) => {
          return <ListItem lemma={item.lemma} key = {item.id} type = {item.pos}/>;
        })}
      </div>
    </div>
  );
};

export default List; // Default export of the List component
