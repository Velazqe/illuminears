import { Container, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_MY_DECKS } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  // Fetching decks data using useQuery
  const { loading, error, data } = useQuery(QUERY_MY_DECKS);

  // If data is loading, display CircularProgress
  if (loading) return <CircularProgress />;

  // If there's an error fetching data, display an error message
  if (error) return <Typography variant="h6">Error fetching decks: {error.message}</Typography>;

  return (
    <Container sx={{ flexGrow: 1, backgroundColor: 'background.secondary', paddingTop: '20px' }}>
      {/* Display username dynamically from Auth */}
      <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>{Auth.getProfile().data.username}'s Decks</Typography>
      
      {/* Grid container to display decks */}
      <Grid container spacing={3}>
        {/* Map over myDecks data and render each deck */}
        {data.myDecks.map((deck) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={deck._id}>
            <Card
              sx={{
                backgroundColor: 'secondary.main',
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              {/* Display the first image of the deck */}
              <CardMedia
                component="img"
                image={deck.cards.length > 0 ? deck.cards[0].image : '/default-image.jpg'} // Use a default image if no cards in deck
                alt={deck.deckName}
                sx={{ width: '100%', height: '90%' }}
              />
              {/* Display the deck name */}
              <CardContent>
                <Typography variant="h6" sx={{color: 'black', display: 'flex', justifyContent: 'center'}}>{deck.deckName}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Profile;
