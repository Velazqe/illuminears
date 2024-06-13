import React, { useState } from 'react';

const SearchBar = ({ onChange }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Its running");
    onChange(query);
  };
  
  return (
    <div className='searchbar'>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};


export default SearchBar;
