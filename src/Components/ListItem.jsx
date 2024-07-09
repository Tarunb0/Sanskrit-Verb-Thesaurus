import React from "react";

const ListItem = (props) => {
  return (
    <div className="list-item">
      <h2 id = "lemma">Lemma : {props.lemma} ({props.type})</h2>
      <br />
    </div>
  );
};

export default ListItem;
