import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#001F3F', // Base primary color
    },
    secondary: {
      main: '#81D8E6', // Base secondary color
    },
    text: {
        primary: '#81D8E6', // White for primary text color
        secondary: '#CCCCCC', // Light gray for secondary text color
      },
    background: {
        default: '#242424', // Set background color to #242424
        secondary: '#343a40',
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