import React, { useState } from "react";
import Grid from '@mui/material/Grid2';
import { Paper, Typography, Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ModalEpisodio from './dash/ModalEpisodio';
import { Link } from 'react-router-dom'


export default function ContenidoPersonajes({ data }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);

    const handleOpenModal = (episodeId) => {
        setSelectedEpisodeId(episodeId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedEpisodeId(null);
    };

    return (
        <div>
            {!data || data.length === 0 ? (
                <Typography variant="h4" color="initial">No hay datos para mostrar.</Typography>
            ) : (
                <Grid container padding={4} spacing={3}>
                    {data.map((personaje, index) => (
                        <Grid key={index} size={{ xs: 4, sm: 6, md: 4 }}>
                            <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
                                <img src={personaje.image} width={280} alt={personaje.name} />

                                <Typography variant="h6" style={{ marginTop: '8px' }}>
                                    Nombre: {personaje.name}
                                </Typography>

                                <Typography variant="body1" style={{ marginBottom: '8px' }}>
                                    Especie: {personaje.species}
                                </Typography>

                                <Typography variant="body1" style={{ marginBottom: '8px' }}>
                                    Estado: {personaje.status}
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="success"
                                    component={Link}
                                    to={`/dash/${personaje.id}`}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Ver más detalles
                                </Button>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ArrowDownwardIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography component="span">Información adicional</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography component="div">
                                            <ul style={{ paddingLeft: '20px', textAlign: 'left' }}>
                                                <li>Género: {personaje.gender}</li>
                                                <li>Origen: {personaje.origin.name}</li>
                                                <li>Ubicación: {personaje.location.name}</li>
                                            </ul>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography component="span">Episodios</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography style={{ textAlign: 'left' }}>
                                            <ul style={{ paddingLeft: '20px' }}>
                                                {personaje.episode.slice(0, 5).map((episodio, idx) => {
                                                    const episodeId = episodio.split('/').pop();
                                                    return (
                                                        <li key={idx}>
                                                            <Button
                                                                onClick={() => handleOpenModal(episodeId)}
                                                                style={{ textTransform: 'none' }}
                                                            >
                                                                Episodio {idx + 1} (ID: {episodeId})
                                                            </Button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Modal para mostrar los detalles del episodio */}
            <ModalEpisodio
                open={modalOpen}
                onClose={handleCloseModal}
                episodeId={selectedEpisodeId}
            />
        </div>
    );
}