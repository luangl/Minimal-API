import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiConsultas } from '../api';
import { Container, TextField, Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const AddConsulta = () => {
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const novaConsulta = { descricao, data, horario };
    apiConsultas.post('/', novaConsulta)
      .then(response => {
        console.log('Consulta adicionada', response.data);
        setOpen(true); // Abrir o diálogo
      })
      .catch(error => console.error('Erro ao adicionar consulta', error));
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1); // Navegar de volta para a página anterior
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Adicionar Consulta
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="date"  // Certifique-se de usar o tipo correto para o campo de data
            value={data}
            onChange={e => setData(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Horário"
            value={horario}
            onChange={e => setHorario(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Adicionar
            </Button>
          </Box>
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

export default AddConsulta;
