import { Container, Typography, Card, CardContent, CardMedia, Button, Modal, Grid, Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import SearchBar from '../SearchBar/searchBar';

const MainCards = () => {
  const [cards, setCards] = useState([]);
  const [initialCards, setInitialCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
  const [selectedCard, setSelectedCard] = useState(null);

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
        setInitialCards(data);
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

  const clearSearch = () => {
    setCards(initialCards);
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

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <Container sx={{ margin: '10px 0px 10px 0px'}}>
      <SearchBar onChange={handleSearch}/>
      <Button variant="contained" onClick={clearSearch} style={{ margin: '10px 0' }}>
        Clear
      </Button>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.Card_Num}>
            <Card className='target-card'
              sx={{
                width: '100%', height: "100%", cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out', '&:hover': {
                  transform: 'scale(1.3)', // Enlarge card on hover
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                },
              }}
              ref={cardRef}
              onClick={() => handleCardClick(card)}
            >
              <CardContent sx={{ width: '100%', height: "100%", padding: 0, paddingBottom: '0 !important' }}>
                <CardMedia
                  component="img"
                  image={card.Image}
                  alt={card.Name}
                  sx={{ width: '100%', height: "100%" }}
                  onError={handleImageError}
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
      
      {selectedCard && (
        <Modal
          open={Boolean(selectedCard)}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height:'auto',
            bgcolor: 'background.secondary',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
            display:'flex',
            flexDirection:'column',
            alignItemsItems:'center',
            justifyContent:'center'
          }}>
            <Button onClick={handleCloseModal} sx={{ position: 'absolute', top: 10, right: 10}}>Close</Button>
            <Typography id="modal-modal-title" variant="h3" component="h3" sx={{textAlign:'center'}}>
              {selectedCard.Name}
            </Typography>
            <img src={selectedCard.Image} alt={selectedCard.Name} style={{width: '350px', borderRadius: '10px', margin:'auto' }} />
            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign:'center'}}>
              <strong>Type:</strong> {selectedCard.Type}<br/>
              <strong>Classifications:</strong> {selectedCard.Classifications}<br/>
              <strong>Abilities:</strong> {selectedCard.Abilities}<br/>
              <strong>Body Text:</strong> {selectedCard.Body_Text}<br/>
              <strong>Rarity:</strong> {selectedCard.Rarity}<br/>
              <strong>Set Name:</strong> {selectedCard.Set_Name}<br/>
              <strong>Card Number:</strong> {selectedCard.Card_Num}<br/>
            </Typography>
          </Box>
        </Modal>
      )}
    </Container>
  );
};

export default MainCards;


