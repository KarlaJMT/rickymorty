import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const About = () => {
  return (
    <div>
      
      <Typography variant="h3" align="center" sx={{ padding: 4 }}>
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
          src='https://wallpapers.com/images/featured/imagenes-de-rick-and-morty-b3e2pq02sb2fuvy3.jpg'
          alt="Rick and Morty"
          style={{
            maxWidth: '60%', // Anchura de la imagen.
            height: 'auto',
            borderRadius: '8px',
          }}
        />
      </Box>

      
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2}}>
        <Box sx={{ maxWidth: '800px', textAlign: 'center' }}>
          
          <Typography variant="h5" gutterBottom>
            ¿Qué es?
          </Typography>

          <Typography variant="body1" align="justify" color="text.secondary">
            Rick & Morty es una serie de televisión estadounidense de animación para adultos creada por Justin Roiland y Dan Harmon en 2013 para Adult Swim, también se emitió en Cartoon Network. La serie sigue las desventuras de un científico, Rick Sánchez, y su fácilmente influenciable nieto, Morty, quienes pasan el tiempo entre la vida doméstica y los viajes espaciales e intergalácticos.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
