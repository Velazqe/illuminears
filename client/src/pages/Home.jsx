import { useQuery } from "@apollo/client";
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";


const Home = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Container sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'background.secondary' }}>
       {Auth.loggedIn() ? (
        <>
        <Typography variant="h1" component="h1" sx={{ margin: '20px', textAlign: 'center'}}>
       WELCOME <br></br>{Auth.getProfile().data.username}!
      </Typography>
      <Button color="inherit" onClick={logout} sx={{ margin: "20px", backgroundColor: 'primary.main'}}>
        Log Out
      </Button>
      </>
       ) : (
        <>
         <Typography variant="h1" component="h1" sx={{ margin: '20px'}}>
       WELCOME ILLUMINEARS!
      </Typography>
      <Button color="inherit" component={Link} to="/login" sx={{ margin: "20px", backgroundColor: 'primary.main'}}>
        Log In
      </Button>
      <Button color="inherit" component={Link} to="/signup" sx={{ margin: "20px", backgroundColor: 'primary.main'}}>
        Sign Up
      </Button>
        </>
       )}
           
    </Container>
  );
};

export default Home;
