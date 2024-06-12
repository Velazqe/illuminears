import { Container, Typography } from '@mui/material';

import Auth from "../utils/auth";

const Profile = () => {

  return (
    <Container sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'background.secondary' }}>
       <Typography variant="h1" component="h1" sx={{ marginTop: '20px'}}>
       Profile Content
      </Typography>      
    </Container>
  );
};

export default Profile;
