import { Container, Typography, Card, CardContent } from '@mui/material';

const MainCards = () => {

    return (
      <Container sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'background.secondary' }}>
         <Typography variant="h1" component="h1" sx={{ marginTop: '20px'}}>
         Main Card Content
        </Typography> 
        <Card sx={{ backgroundColor: 'primary.main' }}>
          <CardContent>
            <Typography>
              Card Content
            </Typography>
          </CardContent>
        </Card>    
      </Container>
    );
  };
  
  export default MainCards;