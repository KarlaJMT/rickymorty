import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', 
        padding: 3, 
      }}
    >
      <Card sx={{
        minWidth: 400,
        maxWidth: 600,
        width: '100%',
        textAlign: 'center', 
      }}>
        <CardContent>
          <Typography variant="h3" component="div" align="center" gutterBottom>
            RICK & MORTY
          </Typography>

          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 3, // Espacio debajo de la imagen.
            }}
          >
            <img
              src='https://repository-images.githubusercontent.com/120371205/b6740400-92d4-11ea-8a13-d5f6e0558e9b'
              alt="Rick and Morty"
              style={{
                maxWidth: '95%', // Anchura de la imagen.
                height: 'auto', 
                borderRadius: '8px', 
              }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" align="center">
            ¿Qué estás esperando? <br/>
            {'"¡Entra a conocer los personajes!"'}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}> {/* Centra botón. */}
          <Button size="small" component={Link} to="/personajes">
            VER PERSONAJES...
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}