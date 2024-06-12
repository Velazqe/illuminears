import { Container, Typography } from '@mui/material';
import MainCards from '../components/MainCards';
import NewCards from '../components/NewCards';

const Builder = () => {

    return (
      <Container sx={{ display: 'flex', flexGrow: 1,  alignItems: 'center', justifyContent: 'center',  backgroundColor: 'background.secondary' }}>
         <MainCards />   
         <NewCards />   
      </Container>
    );
  };
  
  export default Builder;