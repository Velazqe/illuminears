import { Container, Typography } from '@mui/material';
import BuilderCards from '../components/BuilderCards';
import NewCards from '../components/NewCards';

const Builder = () => {

    return (
      <Container sx={{ display: 'flex', flexGrow: 1,  alignItems: 'center', justifyContent: 'center',  backgroundColor: 'background.secondary' }}>
         <BuilderCards />   
         {/* <NewCards />    */}
      </Container>
    );
  };
  
  export default Builder;