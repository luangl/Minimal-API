import React, { useEffect, useState } from 'react';
import { apiConsultas } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns'; // Importe a função format de uma biblioteca de formatação de datas, como date-fns

const ConsultasList = () => {
  const [consultas, setConsultas] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    apiConsultas.get('/')
      .then(response => {
        const consultasFormatted = response.data.map(consulta => ({
          ...consulta,
          data: format(new Date(consulta.data), 'dd/MM/yyyy'), // Formata a data para 'dd/MM/yyyy'
          horario: consulta.horario.substring(0, 5) // Assume que o horário está no formato 'HH:mm' e extrai apenas 'HH:mm'
        }));
        setConsultas(consultasFormatted);
      })
      .catch(error => console.error('Erro ao buscar consultas', error));
  }, []);

  const filteredConsultas = consultas.filter(consulta =>
    consulta.descricao && consulta.descricao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lista de Consultas
        </Typography>
        <TextField
          label="Pesquisar por descrição"
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
              <TableCell>Descrição</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Horário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredConsultas.map(consulta => (
              <TableRow key={consulta.id}>
                <TableCell>{consulta.descricao}</TableCell>
                <TableCell>{consulta.data}</TableCell>
                <TableCell>{consulta.horario}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ConsultasList;
