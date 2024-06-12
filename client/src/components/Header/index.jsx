import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Auth from "../../utils/auth";

export default function Navbar() {
  const currentPage = useLocation().pathname;
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <AppBar position="static" >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h4" color="inherit" component={Link} to="/" sx={{ flexGrow: 1 }}>
          Illuminears Quest
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Button color="inherit" component={Link} to="/cards"
            sx={currentPage === '/cards' ? { color: 'secondary.main' } : {}}>
            Cards
          </Button>
          {Auth.loggedIn() ? (
            <>
            <Button color="inherit" component={Link} to="/builder"
            sx={currentPage === '/builder' ? { color: 'secondary.main' } : {}}>
            Deck Builder
          </Button>
          <Button color="inherit" component={Link} to="/profile"
            sx={currentPage === '/profile' ? { color: 'secondary.main' } : {}}>
            {Auth.getProfile().data.username}'s Decks
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
          </>
        ) : (
          <>
          <Button color="inherit" component={Link} to="/login"
            sx={currentPage === '/login' ? { color: 'secondary.main' } : {}}>
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup"
            sx={currentPage === '/signup' ? { color: 'secondary.main' } : {}}>
            Signup
          </Button>
          </>
        )}          
        </Box>
      </Toolbar>
    </AppBar>
  );
}