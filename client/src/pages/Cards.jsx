import { Container, Typography } from '@mui/material';
import MainCards from '../components/MainCards';

const Cards = () => {

    return (
      <Container sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'background.secondary' }}>
        <MainCards />     
      </Container>
    );
  };
  
  export default Cards;