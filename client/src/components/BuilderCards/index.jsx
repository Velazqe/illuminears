import { Container, Typography, Card, CardContent, CardMedia, Button, CircularProgress, Grid, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const BuilderCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
  const [selectedCards, setSelectedCards] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [saved, setSaved] = useState(false); // State to track if cards are saved
  const [deckTitle, setDeckTitle] = useState("Your Deck"); // State for deck title
  const [isEditingTitle, setIsEditingTitle] = useState(false); // State for editing title

  useEffect(() => {
    fetchCards(currentPage);
  }, [currentPage]);

  const fetchCards = (page) => {
    setLoading(true);
    fetch(`https://api.lorcana-api.com/cards/fetch?page=${page}&pagesize=${cardsPerPage}`)
      .then(response => response.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleCardClick = (card) => {
    const cardIndex = selectedCards.findIndex(item => item.Card_Num === card.Card_Num);

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

  const handleRemoveCard = (card) => {
    const cardIndex = selectedCards.findIndex(item => item.Card_Num === card.Card_Num);

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

  const handleSave = () => {
    // Implement saving logic here (e.g., send selectedCards to a backend API)
    console.log("Saving selected cards:", selectedCards);
    setSaved(true); // Update state to indicate cards are saved
  };

  const handleClearAll = () => {
    setSelectedCards([]);
    setClickCount(0);
    setSaved(false); // Reset saved state
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
    setIsEditingTitle(false);
  };

  // Function to chunk array into groups of 4
  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  // Group selected cards into stacks of 4
  const groupedSelectedCards = chunkArray(selectedCards, 4);

  return (
    <Container sx={{ margin: '10px 0px 10px 0px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flexGrow: 1 }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={3}>
              {cards.map((card) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={card.Card_Num}>
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
                        image={card.Image}
                        alt={card.Name}
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
        <Box sx={{ marginLeft: '20px' }}>
          {isEditingTitle ? (
            <input
              type="text"
              value={deckTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              style={{ fontSize: '1.5rem', marginBottom: '10px', width: '100%' }}
              autoFocus
            />
          ) : (
            <Typography
              variant="h5"
              style={{ cursor: 'pointer', marginBottom: '10px' }}
              onClick={handleEditTitle}
            >
              {deckTitle}
            </Typography>
          )}
          <Typography variant="body1" sx={{ color: clickCount >= 60 ? 'inherit' : 'red' }}> {clickCount}/60 </Typography>
          {clickCount < 60 && (
            <Typography variant="body1" sx={{ color: 'red' }}>Invalid Deck</Typography>
          )}
          {/* Display selected cards with counts */}
          {groupedSelectedCards.map((stack, stackIndex) => (
            <Box key={`stack-${stackIndex}`} sx={{ marginBottom: '90px' }}>
              {stack.map((selectedCard, index) => (
                <Card
                  key={`${selectedCard.Card_Num}-${stackIndex}-${index}`}
                  sx={{
                    width: '100px',
                    height: 'auto',
                    marginRight: '10px',
                    marginBottom: '10px',
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
                    image={selectedCard.Image}
                    alt={selectedCard.Name}
                    onError={handleImageError}
                    sx={{ width: '100%', height: 'auto' }}
                  />
                  {/* Display count of selected cards out of 4 */}
                  <Typography variant="body2" align="center" mt={1} sx={{ color: 'text.secondary', backgroundColor: 'secondary.main', margin: 0 }}>
                    {`${selectedCard.count} / 4 Selected`}
                  </Typography>
                </Card>
              ))}
            </Box>
          ))}
          <Box sx={{ zIndex: 0 }}>
            <Button color="secondary" variant="contained" onClick={handleSave} disabled={selectedCards.length === 0 || saved} sx={{ marginTop: '20px' }}>
              Save
            </Button>
            {saved && <Typography variant="body1" sx={{ color: 'green', marginTop: '10' }}>Cards Saved Successfully!</Typography>}
            <Button variant="contained" color="secondary" onClick={handleClearAll} sx={{ marginTop: '10px' }}>
              Clear All
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BuilderCards;
