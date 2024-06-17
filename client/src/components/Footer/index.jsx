import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, backgroundColor: 'primary.main' }}>
        <Typography variant="body2" color="text.primary" align="center">
          © 2024 Los Tres Codigos
        </Typography>
        <Box sx={{ ml: 2 }}>
          <IconButton component="a" href="https://github.com/Velazqe/illuminears" target="_blank" sx={{ color: 'text.primary' }}>
            <GitHubIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }