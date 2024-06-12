import { Container, Typography } from '@mui/material';

const Logout = () => {

    return (
      <Container sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'background.secondary' }}>
         <Typography variant="h1" component="h1" sx={{ marginTop: '20px'}}>
         Logout Content
        </Typography>      
      </Container>
    );
  };
  
  export default Logout;