// src/AddPaciente.js
import React, { useState } from 'react';
import api from './api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const AddPaciente = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/', { nome, email, telefone, cpf })
      .then(response => {
        console.log('Paciente adicionado', response.data);
      })
      .catch(error => console.error('Erro ao adicionar paciente', error));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Adicionar Paciente
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
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="email"
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
            label="CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
            Adicionar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddPaciente;
