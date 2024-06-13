import { Container, Typography, Card, CardContent, CardMedia, Button, Modal, Grid, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import SearchBar from '../SearchBar/searchBar';

const MainCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
   
  const cardRef = useRef(null);

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

  const handleSearch = async (query) => {
    console.log(query);
    if (query.trim() === '') return;
    try {
      const response = await fetch(`https://api.lorcana-api.com/cards/fetch?search=Name~${query}`);
      const data = await response.json();
      console.log(data);
      setCards(data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    <SearchBar onChange = {handleSearch}/>
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.Card_Num}>
              <Card className='target-card'
               sx={{ width: '100%', height: "100%", cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out','&:hover': {
                transform: 'scale(1.3)', // Enlarge card on hover
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            },}}
              ref={cardRef}>
                <CardContent sx={{ width: '100%', height: "100%", padding: 0, paddingBottom: '0 !important' }}>
                  <CardMedia
                    component="img"
                    image={card.Image}
                    alt={card.Name}
                    sx={{ width: '100%', height: "100%" }}
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
