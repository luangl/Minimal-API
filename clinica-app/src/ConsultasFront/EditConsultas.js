import React, { useEffect, useState } from 'react';
import { apiConsultas } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';

const EditConsulta = () => {
  const [consultas, setConsultas] = useState([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    apiConsultas.get('/')
      .then(response => setConsultas(response.data))
      .catch(error => console.error('Erro ao buscar consultas', error));
  }, []);

  const handleEdit = (id) => {
    setEditing(id);
  };

  const handleSave = (id) => {
    const consulta = consultas.find(c => c.id === id);
    apiConsultas.put(`/${id}`, consulta)
      .then(response => {
        console.log('Consulta atualizada', response.data);
        setEditing(null);
      })
      .catch(error => console.error('Erro ao atualizar consulta', error));
  };

  const handleChange = (id, field, value) => {
    setConsultas(consultas.map(consulta => 
      consulta.id === id ? { ...consulta, [field]: value } : consulta
    ));
  };

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
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredConsultas.map(consulta => (
              <TableRow key={consulta.id}>
                <TableCell>
                  {editing === consulta.id ? (
                    <TextField
                      value={consulta.descricao}
                      onChange={e => handleChange(consulta.id, 'descricao', e.target.value)}
                    />
                  ) : (
                    consulta.descricao
                  )}
                </TableCell>
                <TableCell>
                  {editing === consulta.id ? (
                    <TextField
                      value={consulta.data}
                      onChange={e => handleChange(consulta.id, 'data', e.target.value)}
                    />
                  ) : (
                    consulta.data
                  )}
                </TableCell>
                <TableCell>
                  {editing === consulta.id ? (
                    <TextField
                      value={consulta.horario}
                      onChange={e => handleChange(consulta.id, 'horario', e.target.value)}
                    />
                  ) : (
                    consulta.horario
                  )}
                </TableCell>
                <TableCell>
                  {editing === consulta.id ? (
                    <IconButton onClick={() => handleSave(consulta.id)}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(consulta.id)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EditConsulta;
