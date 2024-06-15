import { Container, Typography } from '@mui/material';
import BuilderCards from '../components/BuilderCards';

const Builder = () => {

    return (
      <Container sx={{ display: 'flex', flexGrow: 1,  alignItems: 'center', justifyContent: 'center',  backgroundColor: 'background.secondary' }}>
         <BuilderCards />   
      </Container>
    );
  };
  
  export default Builder;