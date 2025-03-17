import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { TextField, Button, Card } from "@mui/material";
import ContenidoPersonajes from '../ContenidoPersonajes';

export default function HomePage() {
    const [textobuscar, setTextoB] = useState('');
    const [datos, setDatos] = useState([]);

    const obtenerTodosLosPersonajes = async () => {
        let allCharacters = [];
        let nextPage = 'https://rickandmortyapi.com/api/character/';

        try {
            while (nextPage) {
                const response = await fetch(nextPage);
                const result = await response.json();
                allCharacters = [...allCharacters, ...result.results];
                nextPage = result.info.next; 
            }
            setDatos(allCharacters);
        } catch (error) {
            console.error('Error al obtener los personajes:', error);
        }
    };

    const obtenerPersonajesPorNombre = async () => {
        const buscar = textobuscar.trim();
        if (buscar === "") {
            alert("Campos vacíos, introduce algo.");
        } else {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${buscar}`);
                const result = await response.json();
                setDatos(result.results);
                console.log(result);
            } catch (error) {
                console.error(error);
                alert("No se encontraron personajes con ese nombre.");
            }
        }
    };

    useEffect(() => {
        obtenerTodosLosPersonajes(); 
    }, []);

    return (
        <div>
            <br />

            <Grid container spacing={2} padding={4} alignItems="center">
                <Grid size={{xs:8 , md:8}}>
                    <Card variant="standard">
                        <TextField
                            onChange={(e) => setTextoB(e.target.value)}
                            label='Buscar personaje por nombre'
                            fullWidth
                            size="medium"
                            variant="filled"
                            id="character-name"
                            aria-label="Introduce el nombre del personaje"
                        />
                    </Card>
                </Grid>
                <Grid size={{xs:4 , md:4}}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ height: '56px' }}
                        aria-label="Buscar personaje"
                        onClick={obtenerPersonajesPorNombre}
                    >
                        Buscar
                    </Button>
                </Grid>
            </Grid>

            <ContenidoPersonajes data={datos} />
        </div>
    );
}