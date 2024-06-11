import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008080', // Base primary color
    },
    secondary: {
      main: '#00FFFF', // Base secondary color
    },
    text: {
        primary: '#fff', // White for primary text color
        secondary: '#ccc', // Light gray for secondary text color
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
      color: '#fff'
    },
  },
});

export default theme;