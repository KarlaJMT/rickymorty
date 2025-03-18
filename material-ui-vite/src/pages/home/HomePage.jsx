import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid2';
import { TextField, Button, Card, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import ContenidoPersonajes from '../ContenidoPersonajes';

export default function HomePage() {
    const [textobuscar, setTextoB] = useState('');
    const [tipoBusqueda, setTipoBusqueda] = useState('name'); // 'name', 'status', 'location', 'episode'
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

    const obtenerPersonajes = async () => {
        const buscar = textobuscar.trim();
        if (buscar === "") {
            alert("Campos vacíos, introduce algo.");
        } else {
            try {
                let url = '';
                switch (tipoBusqueda) {
                    case 'nombre':
                        url = `https://rickandmortyapi.com/api/character/?name=${buscar}`;
                        break;
                    case 'estatus':
                        url = `https://rickandmortyapi.com/api/character/?status=${buscar}`;
                        break;
                    case 'ubicacion':
                        url = `https://rickandmortyapi.com/api/location/?name=${buscar}`;
                        break;
                    case 'episodio':
                        url = `https://rickandmortyapi.com/api/episode/?name=${buscar}`;
                        break;
                    default:
                        url = `https://rickandmortyapi.com/api/character/?name=${buscar}`;
                }

                const response = await fetch(url);
                const result = await response.json();
                if (tipoBusqueda === 'location' || tipoBusqueda === 'episode') {
                    
                    const characterUrls = tipoBusqueda === 'ubicacion' ? result.results[0]?.residents : result.results[0]?.characters;
                    if (characterUrls && characterUrls.length > 0) {
                        const characterResponses = await Promise.all(characterUrls.map(url => fetch(url)));
                        const characterResults = await Promise.all(characterResponses.map(res => res.json()));
                        setDatos(characterResults);
                    } else {
                        setDatos([]);
                    }
                } else {
                    setDatos(result.results || []);
                }
            } catch (error) {
                console.error(error);
                alert("No se encontraron resultados.");
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
                <Grid size={{ xs: 4, sm: 6, md: 8 }}>
                    <Card variant="standard">
                        <TextField
                            onChange={(e) => setTextoB(e.target.value)}
                            label={`Buscar por ${tipoBusqueda}`}
                            fullWidth
                            size="medium"
                            variant="filled"
                            id="search-input"
                            aria-label={`Introduce el ${tipoBusqueda} para buscar`}
                        />
                    </Card>
                </Grid>
                <Grid size={{ xs: 4, sm: 6, md: 2 }}>
                    <FormControl fullWidth variant="filled">
                        <InputLabel id="search-type-label">Tipo de búsqueda</InputLabel>
                        <Select
                            labelId="search-type-label"
                            value={tipoBusqueda}
                            onChange={(e) => setTipoBusqueda(e.target.value)}
                            label="Tipo de búsqueda"
                        >
                            <MenuItem value="nombre">Nombre</MenuItem>
                            <MenuItem value="estatus">Estatus</MenuItem>
                            <MenuItem value="ubicacion">Ubicación</MenuItem>
                            <MenuItem value="episodio">Episodio</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 4, sm: 6, md: 2 }}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ height: '56px' }}
                        aria-label="Buscar"
                        onClick={obtenerPersonajes}
                    >
                        Buscar
                    </Button>
                </Grid>
            </Grid>

            <ContenidoPersonajes data={datos} />
        </div>
    );
}