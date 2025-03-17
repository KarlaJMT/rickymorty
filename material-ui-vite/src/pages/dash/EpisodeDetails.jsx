import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Container, Box, Button } from '@mui/material';

export default function EpisodeDetails() {
    const { id } = useParams();
    const [episode, setEpisode] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/episode/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEpisode(data);
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

    if (!episode) {
        return <div>No se encontraron detalles para este episodio.</div>;
    }

    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', my: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    {episode.name}
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom>
                    Código del Episodio: {episode.episode}
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom>
                    Fecha de lanzamiento: {episode.air_date}
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }}>
                    Personajes:
                </Typography>
                <Box sx={{ textAlign: 'left', pl: 4 }}>
                    <ul>
                        {episode.characters.map((characterUrl, index) => {
                            const characterId = characterUrl.split('/').pop();
                            return (
                                <li key={index}>
                                    <Link to={`/character/${characterId}`}>
                                        Personaje {characterId}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </Box>

                {/* Botón para reproducir el episodio (si tienes un enlace de reproducción) */}
                {episode.url && (
                    <Button
                        variant="contained"
                        color="primary"
                        href={episode.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mt: 3 }}
                    >
                        Reproducir Episodio
                    </Button>
                )}
            </Paper>
        </Container>
    );
}