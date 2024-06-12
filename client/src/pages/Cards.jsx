import { Container, Typography } from '@mui/material';
import MainCards from '../components/MainCards';
import Search from '../components/SearchBar';

const Cards = () => {

    return (
      <Container sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'background.secondary' }}>
        <Search />
        <MainCards />     
      </Container>
    );
  };
  
  export default Cards;