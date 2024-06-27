import React, { useEffect, useState } from 'react';
import { apiPacientes } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const PacientesList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    apiPacientes.get('/')
      .then(response => setPacientes(response.data))
      .catch(error => console.error('Erro ao buscar pacientes', error));
  }, []);

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome && paciente.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lista de Pacientes
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
            {filteredPacientes.map(paciente => (
              <TableRow key={paciente.id}>
                <TableCell>{paciente.nome}</TableCell>
                <TableCell>{paciente.telefone}</TableCell>
                <TableCell>{paciente.cpf}</TableCell>
                <TableCell>{paciente.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PacientesList;
