import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Button, Container, Box, List, ListItem, ListItemText } from '@mui/material';

export default function PersonajeDetails() {
    let { id } = useParams();
    const [detalles, setDetalles] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setDetalles(data);
                setCargando(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setCargando(false);
            });
    }, [id]);

    if (cargando) {
        return <div>Cargando...</div>;
    }

    if (!detalles) {
        return <div>No se encontraron detalles para este personaje.</div>;
    }

    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', my: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>

                <Typography variant="h3" component="h1" gutterBottom>
                    {detalles.name}
                </Typography>

                <Box sx={{ my: 3 }}>
                    <img
                        src={detalles.image}
                        alt={detalles.name}
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                </Box>

                <Typography variant="h5" component="h2" gutterBottom>
                    Especie: {detalles.species}
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom>
                    Estado: {detalles.status}
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom>
                    Género: {detalles.gender}
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom>
                    Origen: {detalles.origin.name}
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom>
                    Ubicación: {detalles.location.name}
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }}>
                    Episodios:
                </Typography>
                <List component="ul" sx={{ listStyleType: 'disc', pl: 4 }}>
                    {detalles.episode.map((episodio, index) => {
                        const episodeId = episodio.split('/').pop();
                        return (
                            <ListItem key={index} sx={{ display: 'list-item' }}>
                                <ListItemText primary={`Episodio ${episodeId}`} />
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </Container>
    );
}