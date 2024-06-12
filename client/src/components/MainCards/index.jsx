import { Container, Typography, Card, CardContent, Button, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

const MainCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);

  useEffect(() => {
    fetchCards(currentPage);
  }, [currentPage]);

  const fetchCards = (page) => {
    setLoading(true);
    fetch(`http://api.lorcana-api.com/cards/fetch?displayonly=Image&page=${page}&limit=${cardsPerPage}`)
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
    <Container>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardContent>
                  <img
                    src={card.image}
                    alt={card.name}
                    onError={handleImageError}
                    style={{ width: '100%' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography variant="body1"> Page {currentPage} </Typography>
        <Button variant="contained" onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default MainCards;
