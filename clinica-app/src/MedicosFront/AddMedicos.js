import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiMedicos } from '../api';
import { Container, TextField, Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const AddMedico = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoMedico = { nome, cpf, telefone, email };
    apiMedicos.post('/', novoMedico)
      .then(response => {
        console.log('Médico adicionado', response.data);
        setOpen(true); // Abrir o diálogo
      })
      .catch(error => console.error('Erro ao adicionar médico', error));
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1); // Navegar de volta para a página anterior
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Adicionar Médico
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Telefone"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            Médico cadastrado com sucesso!
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

export default AddMedico;
