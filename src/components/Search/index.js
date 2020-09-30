import React from "react";
import "./style.css";

function Search({ onSearch, value }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Procurar..."
        onChange={e => onSearch(e.target.value)}
        value={value}
      />
    </div>
  );
}

export default Search;
