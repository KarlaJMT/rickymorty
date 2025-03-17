import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, CircularProgress } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
    maxHeight: '80vh', 
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    overflowY: 'auto',
};

export default function ModalEpisodio({ open, onClose, episodeId }) {
    const [episode, setEpisode] = useState(null);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (episodeId) {
            setCargando(true);
            fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`)
                .then((response) => response.json())
                .then((data) => {
                    setEpisode(data);
                    setCargando(false);
                })
                .catch((error) => {
                    console.error('Error fetching episode:', error);
                    setCargando(false);
                });
        }
    }, [episodeId]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {cargando ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Detalles del Episodio
                        </Typography>
                        {episode ? (
                            <>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Nombre:</strong> {episode.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Código:</strong> {episode.episode}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Fecha de lanzamiento:</strong> {episode.air_date}
                                </Typography>
                                {/* <Typography variant="body1" gutterBottom>
                                    <strong>Personajes:</strong>
                                </Typography>
                                <ul>
                                    {episode.characters.map((characterUrl, index) => {
                                        const characterId = characterUrl.split('/').pop();
                                        return (
                                            <li key={index}>
                                                Personaje {characterId}
                                            </li>
                                        );
                                    })}
                                </ul> */}
                            </>
                        ) : (
                            <Typography variant="body1" gutterBottom>
                                No se encontraron detalles para este episodio.
                            </Typography>
                        )}
                    </>
                )}
            </Box>
        </Modal>
    );
}