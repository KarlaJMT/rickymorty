import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Todos los campos son obligatorios.');
      setSuccess('');
    } else {
      setError('');
      setSuccess('Formulario enviado con éxito.');
      console.log('Datos del formulario:', formData);
      // Enviar mensajes a un servidor (por si se llega a usar).
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Contacto
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: '400px',
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField
          label="Nombre"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          label="Correo electrónico"
          name="email"
          variant="outlined"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          label="Mensaje"
          name="message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={formData.message}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          
          Enviar
        </Button>
      </Box>
    </Box>
  );
};