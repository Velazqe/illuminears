import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DECK, UPDATE_DECK } from '../../utils/mutations';
import SearchBar from '../SearchBar/searchBar';

const BuilderCards = ({ selectedDeck, isEditing, setIsEditing }) => {
  const [cards, setCards] = useState([]);
  const [initialCards, setInitialCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
  const [selectedCards, setSelectedCards] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [saved, setSaved] = useState(false); // State to track if cards are saved
  const [saving, setSaving] = useState(false); // State to track saving process
  const [deckTitle, setDeckTitle] = useState("Your Deck"); // State for deck title
  const [isEditingTitle, setIsEditingTitle] = useState(false); // State for editing title
  const [addDeck] = useMutation(ADD_DECK);
  const [updateDeck] = useMutation(UPDATE_DECK);

  useEffect(() => {
    fetchCards(currentPage);
  }, [currentPage]);

  // Update deckTitle, selectedCards, and clickCount on prop change while in deck editing mode
  useEffect(() => {
    if (isEditing && selectedDeck) {
      console.log(selectedDeck);
      console.log(isEditing);
      const cardsWithoutTypename = selectedDeck.cards.map(card => omitTypename(card));
      console.log(cardsWithoutTypename);
      setSelectedCards(cardsWithoutTypename);
      setDeckTitle(selectedDeck.deckName);
      setClickCount(selectedDeck.cards?.length || 0);
    }
  }, [isEditing, selectedDeck]);

  const omitTypename = (obj) => {
    if (!obj) return {}; // Handle undefined or null values
    const newObj = {};
    for (const key in obj) {
      if (key !== '__typename') {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

  const fetchCards = (page) => {
    setLoading(true);
    fetch(`https://api.lorcana-api.com/cards/fetch?page=${page}&pagesize=${cardsPerPage}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        const lowercaseData = makeKeysLowercase(data);
        // findUnknownKeysInArray(data);
        setCards(lowercaseData);
        setInitialCards(lowercaseData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleSearch = async (query) => {
    console.log(query);
    if (query.trim() === '') return;
    try {
      const response = await fetch(`https://api.lorcana-api.com/cards/fetch?search=Name~${query}`);
      const data = await response.json();
      const lowercaseData = makeKeysLowercase(data);
      console.log(lowercaseData);
      setCards(lowercaseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const clearSearch = () => {
    setCards(initialCards);
  };

  const handleCardClick = (card) => {
    console.log(card);
    const cardIndex = selectedCards.findIndex(item => item.card_num === card.card_num);

    if (cardIndex === -1) {
      // Card not in selectedCards, add it with count 1
      setSelectedCards([...selectedCards, { ...card, count: 1 }]);
      setClickCount(prevCount => prevCount + 1);
    } else if (selectedCards[cardIndex].count < 4) {
      // Card already in selectedCards, increase its count (up to 4)
      const updatedSelectedCards = [...selectedCards];
      updatedSelectedCards[cardIndex] = { ...updatedSelectedCards[cardIndex], count: updatedSelectedCards[cardIndex].count + 1 };
      setSelectedCards(updatedSelectedCards);
      setClickCount(prevCount => prevCount + 1);
    }
  };

  function makeKeysLowercase(data) {
    if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data)) {
        return data.map(item => makeKeysLowercase(item));
      } else {
        return Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key.toLowerCase(), makeKeysLowercase(value)])
        );
      }
    } else {
      return data;
    }
  }

  function findUnknownKeysInArray(data, knownCardKeys = [
    "artist", "set_name", "classifications", "abilities", "set_num",
    "color", "franchise", "image", "cost", "inkable", "name", "type",
    "lore", "rarity", "flavor_text", "unique_id", "card_num", "body_text",
    "willpower", "card_variants", "strength", "set_id", "count"
  ]) {
    console.log(data);
    if (!Array.isArray(data)) {
      return; // Handle non-array data (avoid errors)
    }
  
    for (const obj of data) {
      if (typeof obj !== 'object' || obj === null) {
        continue; // Skip non-object elements in the array
      }
  
      const unknownKeys = [];
      for (const key in obj) {
        const lowercasedKey = key.toLowerCase();
        if (!knownCardKeys.includes(lowercasedKey)) {
          unknownKeys.push(lowercasedKey);
        }
      }
  
      if (unknownKeys.length > 0) {
        console.log(`Unknown keys found in object: ${unknownKeys.join(', ')}`);
      }
    }
  }

  const handleRemoveCard = (card) => {
    const cardIndex = selectedCards.findIndex(item => item.card_num === card.card_num);

    if (cardIndex !== -1) {
      const updatedSelectedCards = [...selectedCards];
      if (updatedSelectedCards[cardIndex].count === 1) {
        // Remove the entire card object if count is 1
        updatedSelectedCards.splice(cardIndex, 1);
      } else {
        // Decrease the count if count is more than 1
        updatedSelectedCards[cardIndex] = { ...updatedSelectedCards[cardIndex], count: updatedSelectedCards[cardIndex].count - 1 };
      }
      setSelectedCards(updatedSelectedCards);
      setClickCount(prevCount => prevCount - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleEdit = async () => {
    console.log(deckTitle);
    console.log(selectedCards);
    console.log(selectedDeck._id);
    try {
      setSaving(true); // Start saving process
      const { data } = await updateDeck({ variables: { deckId: selectedDeck._id, deckName: deckTitle, cards: selectedCards } });
      console.log(data);
      setSaved(true); // Update state to indicate cards are saved
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false); // End saving process
    }
  }

  const handleSave = async () => {
    console.log(deckTitle);
    console.log(selectedCards);
    try {
      setSaving(true); // Start saving process
      const { data } = await addDeck({ variables: { deckName: deckTitle, cards: selectedCards } });
      console.log(data);
      setSaved(true); // Update state to indicate cards are saved
      // Resetting the states
      setSelectedCards([]);
      setClickCount(0);
      setDeckTitle("Your Deck");
      setCurrentPage(1); // Reset page to 1
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false); // End saving process
    }
  };

  const handleClearAll = () => {
    setSelectedCards([]);
    setClickCount(0);
    setSaved(false); // Reset saved state
    setDeckTitle("Your Deck");
  };

  const handleImageError = (event) => {
    event.target.src = '../../../public/vite.svg';
    // Random placeholder for now to see if they load
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (event) => {
    setDeckTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    if (deckTitle.trim() === '') {
      setDeckTitle("Your Deck"); // Reset deck title if empty after blur
    }
    setIsEditingTitle(false);
  };

  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleTitleBlur();
    }
  };

  // Function to chunk array into groups of 4
  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  // Categorize selected cards by type
  const categorizedSelectedCards = {
    Character: selectedCards.filter(card => card.type === 'Character'),
    Location: selectedCards.filter(card => card.type === 'Location'),
    Action: selectedCards.filter(card => card.type === 'Action' || card.type === 'Action - Song'),
    Item: selectedCards.filter(card => card.type === 'Item')
  };

  return (
    <Box sx={{ margin: '10px 0px 10px 0px' }}>
      <SearchBar onChange={handleSearch}/>
      <Button variant="contained" onClick={clearSearch} style={{margin: '10px 0' }}>
        Clear
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '100%', flexGrow: 1 }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={3}>
              {cards.map((card) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={card.card_num}>
                                <Card
                                  sx={{
                                    width: '100%',
                                    height: "100%",
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease-in-out', // Add transition for smooth effect
                                    '&:hover': {
                                      transform: 'scale(1.3)', // Enlarge card on hover
                                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                    }
                                  }}
                                  onClick={() => handleCardClick(card)}
                                >
                                  <CardContent sx={{ width: '100%', height: "100%", padding: 0, paddingBottom: '0 !important' }}>
                                    <CardMedia
                                      component="img"
                                      image={card.image}
                                      alt={card.name}
                                      onError={handleImageError}
                                      sx={{ width: '100%', height: "100%" }}
                                    />
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                        </Grid>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1}>
                          Previous
                        </Button>
                        <Typography variant="body1"> Page {currentPage} </Typography>
                        <Button variant="contained" onClick={handleNextPage}>
                          Next
                        </Button>
                      </Box>
                    </Box>
                    <Box sx={{ marginLeft: '20px', width: '500px' }}>
                      {isEditingTitle ? (
                        <input
                          type="text"
                          value={deckTitle}
                          onChange={handleTitleChange}
                          onBlur={handleTitleBlur}
                          onKeyPress={handleKeyPress} // Handle Enter key press to save title change
                          style={{ fontSize: '1.5rem', marginBottom: '10px', width: '100%' }}
                          autoFocus
                        />
                      ) : (
                        <Typography
                          variant="h3"
                          style={{ display: 'flex', cursor: 'pointer', marginBottom: '10px', justifyContent: 'center' }}
                          onClick={handleEditTitle}
                        >
                          {deckTitle}
                        </Typography>
                      )}
                      <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center', color: clickCount >= 60 ? 'inherit' : 'red' }}> {clickCount}/60 </Typography>
                      {clickCount < 60 && (
                        <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center', color: 'red' }}>Invalid Deck</Typography>)}
                        {/* Display selected cards with counts */}
                        {['Character', 'Location', 'Action', 'Item'].map((type) => (
                          <Box key={type} sx={{ marginBottom: '20px' }}>
                            <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant="h4">{type}</Typography>
                            <Grid container spacing={1}>
                              {categorizedSelectedCards[type].map((selectedCard, index) => (
                                <Grid item xs={3} key={`${selectedCard.card_num}-${index}`}>
                                  <Card
                                    sx={{
                                      width: '100%',
                                      height: 'auto', // Set a consistent height
                                      cursor: 'pointer',
                                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                      transition: 'transform 0.2s ease-in-out',
                                      '&:hover': {
                                        transform: 'scale(2.3)', // Enlarge card on hover
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                      },
                                    }}
                                    onClick={() => handleRemoveCard(selectedCard)}
                                  >
                                    <CardMedia
                                      component="img"
                                      image={selectedCard.image}
                                      alt={selectedCard.name}
                                      onError={handleImageError}
                                      sx={{ width: '100%', height: '100%' }}
                                    />
                                    <Typography variant="body2" align="center" mt={1} sx={{ color: 'text.secondary', backgroundColor: 'secondary.main', margin: 0 }}>
                                      {`${selectedCard.count} / 4 Selected`}
                                    </Typography>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '20px' }}>
                        {isEditing ? (
                          <Button color="secondary" variant="contained" onClick={handleEdit} disabled={selectedCards.length === 0 || saving}>
                            {saving ? <CircularProgress size={24} /> : 'Edit'}
                          </Button>
                        ) : (
                          <Button color="secondary" variant="contained" onClick={handleSave} disabled={selectedCards.length === 0 || saving}>
                            {saving ? <CircularProgress size={24} /> : 'Save'}
                          </Button>
                        )}            
                          {saved && <Typography variant="body1" sx={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>Cards Saved Successfully!</Typography>}
                          <Button variant="contained" color="secondary" onClick={handleClearAll} sx={{ marginTop: '10px' }}>
                            Clear All
                          </Button>
                        </Box>
                    </Box>
                  </Box>
                </Box>
              );
            };
            
            export default BuilderCards;
            
