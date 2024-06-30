// src/ExamesFront/AddExame.js
import React, { useState } from 'react';
import { apiExames } from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const AddExame = () => {
  const [tipo, setTipo] = useState('');
  const [resultado, setResultado] = useState('');
  const [data, setData] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiExames.post('/', { tipo, resultado, data });
      setTipo('');
      setResultado('');
      setData('');
      setOpen(true);
    } catch (error) {
      console.error('Erro ao adicionar exame', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1); 
  };


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Adicionar Exame
      </Typography>
      <Box sx={{ mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tipo"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Resultado"
            value={resultado}
            onChange={e => setResultado(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Adicionar Exame
          </Button>
        </form>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastro Realizado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Consulta cadastrada com sucesso!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddExame;
