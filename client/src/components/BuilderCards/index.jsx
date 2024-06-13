

import { Container, Typography, Card, CardContent, CardMedia, Button, CircularProgress, Grid, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const BuilderCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
  const [selectedCards, setSelectedCards] = useState([]);

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
    } else if (selectedCards[cardIndex].count < 4) {
      // Card already in selectedCards, increase its count (up to 4)
      const updatedSelectedCards = [...selectedCards];
      updatedSelectedCards[cardIndex] = { ...updatedSelectedCards[cardIndex], count: updatedSelectedCards[cardIndex].count + 1 };
      setSelectedCards(updatedSelectedCards);
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

  const handleImageError = (event) => {
    event.target.src = '../../../public/vite.svg'; 
    // Random placeholder for now to see if they load
  };

  return (
    <Container sx={{ margin: '10px 0px 10px 0px'}}>
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
                  <Card sx={{ width: '100%', height: "100%", cursor: 'pointer' }} onClick={() => handleCardClick(card)}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Typography variant="body1"> Page {currentPage} </Typography>
            <Button variant="contained" onClick={handleNextPage}>
              Next
            </Button>
          </div>
        </Box>
        <Box sx={{ marginLeft: '20px', position: 'relative', width: '300px' }}>
          {selectedCards.length > 0 && (
            <>
              <Typography variant="h5">Selected Cards</Typography>
              {selectedCards.map((selectedCard, index) => (
                Array.from({ length: selectedCard.count }).map((_, instanceIndex) => (
                  <Card
                    key={`${selectedCard.Card_Num}-${index}-${instanceIndex}`}
                    sx={{
                      position: 'absolute',
                      top: `${instanceIndex * +15}px`, // Adjust overlap
                      left: '0px',
                      zIndex: selectedCards.length - index + instanceIndex // Ensure proper stacking order
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
                  </Card>
                ))
              ))}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BuilderCards;
