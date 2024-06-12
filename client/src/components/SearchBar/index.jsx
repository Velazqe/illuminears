import SearchBar from "./searchBar";

const Search = () => {
    const [results, setResults] = useState([]);
  
    const handleSearch = async (query) => {
      if (query.trim() === '') return;
      try {
        const response = await fetch(`api.lorcana-api.com/cards/fetch?search=${query}`);
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <div>
        <SearchBar onSearch={handleSearch} />
        <div>
          {results.map((result) => (
            <div key={result.id}>{result.name}</div>
          ))}
        </div>
      </div>
    );
  };

  export default Search