// src/ExamesFront/ExamesList.js
import React, { useEffect, useState } from 'react';
import { apiExames } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ExamesList = () => {
  const [exames, setExames] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    apiExames.get('/')
      .then(response => setExames(response.data))
      .catch(error => console.error('Erro ao buscar exames', error));
  }, []);

  const filteredExames = exames.filter(exame =>
    exame.tipo && exame.tipo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lista de Exames
        </Typography>
        <TextField
          label="Pesquisar por tipo"
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
              <TableCell>Tipo</TableCell>
              <TableCell>Resultado</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExames.map(exame => (
              <TableRow key={exame.id}>
                <TableCell>{exame.tipo}</TableCell>
                <TableCell>{exame.resultado}</TableCell>
                <TableCell>{exame.data}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ExamesList;
