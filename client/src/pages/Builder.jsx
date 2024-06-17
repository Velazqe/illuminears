import { Container, Typography } from '@mui/material';
import BuilderCards from '../components/BuilderCards';

const Builder = () => {

    return (
      <Container sx={{ flexGrow: 1, backgroundColor: 'background.secondary', paddingTop: '20px' }}>
         <BuilderCards />   
      </Container>
    );
  };
  
  export default Builder;