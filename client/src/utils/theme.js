import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#001F3F', // Dark blue
    },
    secondary: {
      main: '#81D8E6', // Light teal
    },
    text: {
        primary: '#81D8E6', // Teal for primary text color
        secondary: '#001F3F', // Light gray for secondary text color
      },
    background: {
        default: '#242424', // dark grey, almost black
        secondary: '#343a40', // lighter grey
      },
  },
  typography: {
    fontFamily: 'Poppins',
    h1: {
      fontSize: '2rem',
      color: '#81D8E6'
    },
  },
});

export default theme;