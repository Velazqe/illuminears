import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

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
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        padding: '20px', 
        backgroundColor: 'background.main' 
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        sx={{ marginRight: '10px' }}
      />
      <Button 
        variant="contained" 
        onClick={handleSearch}
        sx={{ padding: '10px 20px' }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;

