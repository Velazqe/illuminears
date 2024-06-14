import { Container, Typography } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_MY_DECKS } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_MY_DECKS);
  console.log(data);
  // console.log(data.me._id);

  return (
    <Container sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'background.secondary' }}>
       <Typography variant="h1" component="h1" sx={{ marginTop: '20px'}}>
       Profile Content
      </Typography>      
    </Container>
  );
};

export default Profile;
