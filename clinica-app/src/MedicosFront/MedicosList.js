// src/MedicosList.js
import React, { useEffect, useState } from 'react';
import { apiMedicos } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MedicosList = () => {
  const [medicos, setMedicos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    apiMedicos.get('/')
      .then(response => setMedicos(response.data))
      .catch(error => console.error('Erro ao buscar médicos', error));
  }, []);

  const filteredMedicos = medicos.filter(medico =>
    medico.nome && medico.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lista de Médicos
        </Typography>
        <TextField
          label="Pesquisar por nome"
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: <SearchIcon />
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMedicos.map(medico => (
              <TableRow key={medico.id}>
                <TableCell>{medico.nome}</TableCell>
                <TableCell>{medico.telefone}</TableCell>
                <TableCell>{medico.cpf}</TableCell>
                <TableCell>{medico.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MedicosList;
