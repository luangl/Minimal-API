import React, { useEffect, useState } from 'react';
import { apiExames } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';

const EditConsulta = () => {
  const [exames, setExames] = useState([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    apiExames.get('/')
      .then(response => setExames(response.data))
      .catch(error => console.error('Erro ao buscar consultas', error));
  }, []);

  const handleEdit = (id) => {
    setEditing(id);
  };

  const handleSave = (id) => {
    const exame = exames.find(c => c.id === id);
    apiExames.put(`/${id}`, exame)
      .then(response => {
        console.log('Consulta atualizada', response.data);
        setEditing(null);
      })
      .catch(error => console.error('Erro ao atualizar consulta', error));
  };

  const handleChange = (id, field, value) => {
    setExames(exames.map(exame => 
      exame.id === id ? { ...exame, [field]: value } : exame
    ));
  };

  const filteredExames = exames.filter(exame =>
    exame.tipo && exame.tipo.toLowerCase().includes(search.toLowerCase())
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
              <TableCell>Tipo</TableCell>
              <TableCell>Resultado</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExames.map(exame => (
              <TableRow key={exame.id}>
                <TableCell>
                  {editing === exame.id ? (
                    <TextField
                      value={exame.tipo}
                      onChange={e => handleChange(exame.id, 'tipo', e.target.value)}
                    />
                  ) : (
                    exame.tipo
                  )}
                </TableCell>
                <TableCell>
                  {editing === exame.id ? (
                    <TextField
                      value={exame.resultado}
                      onChange={e => handleChange(exame.id, 'resultado', e.target.value)}
                    />
                  ) : (
                    exame.resultado
                  )}
                </TableCell>
                <TableCell>
                  {editing === exame.id ? (
                    <TextField
                      value={exame.data}
                      onChange={e => handleChange(exame.id, 'data', e.target.value)}
                    />
                  ) : (
                    exame.data
                  )}
                </TableCell>
                <TableCell>
                  {editing === exame.id ? (
                    <IconButton onClick={() => handleSave(exame.id)}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(exame.id)}>
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
