import SearchBar from "./searchBar";
import { useState } from "react";

const Search = () => {
    const [results, setResults] = useState([]);
  
    // const handleSearch = async (query) => {
    //   console.log(query);
    //   if (query.trim() === '') return;
    //   try {
    //     const response = await fetch(`https://api.lorcana-api.com/cards/fetch?search=Name~${query}`);
    //     const data = await response.json();
    //     console.log(data);
    //     setResults(data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
  
    return (
      <div>
        {/* <SearchBar onSearch={handleSearch} /> */}
        <div>
          {results.map((result) => (
            <div key={result.id}>{result.name}</div>
          ))}
        </div>
      </div>
    );
  };

  export default Search