// src/EditMedico.js
import React, { useEffect, useState } from 'react';
import { apiMedicos } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';

const EditMedico = () => {
  const [medicos, setMedicos] = useState([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    apiMedicos.get('/')
      .then(response => setMedicos(response.data))
      .catch(error => console.error('Erro ao buscar médicos', error));
  }, []);

  const handleEdit = (id) => {
    setEditing(id);
  };

  const handleSave = (id) => {
    const medico = medicos.find(m => m.id === id);
    apiMedicos.put(`/${id}`, medico)
      .then(response => {
        console.log('Médico atualizado', response.data);
        setEditing(null);
      })
      .catch(error => console.error('Erro ao atualizar médico', error));
  };

  const handleChange = (id, field, value) => {
    setMedicos(medicos.map(medico => 
      medico.id === id ? { ...medico, [field]: value } : medico
    ));
  };

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
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMedicos.map(medico => (
              <TableRow key={medico.id}>
                <TableCell>
                  {editing === medico.id ? (
                    <TextField
                      value={medico.nome}
                      onChange={e => handleChange(medico.id, 'nome', e.target.value)}
                    />
                  ) : (
                    medico.nome
                  )}
                </TableCell>
                <TableCell>
                  {editing === medico.id ? (
                    <TextField
                      value={medico.telefone}
                      onChange={e => handleChange(medico.id, 'telefone', e.target.value)}
                    />
                  ) : (
                    medico.telefone
                  )}
                </TableCell>
                <TableCell>
                  {editing === medico.id ? (
                    <TextField
                      value={medico.cpf}
                      onChange={e => handleChange(medico.id, 'cpf', e.target.value)}
                    />
                  ) : (
                    medico.cpf
                  )}
                </TableCell>
                <TableCell>
                  {editing === medico.id ? (
                    <TextField
                      value={medico.email}
                      onChange={e => handleChange(medico.id, 'email', e.target.value)}
                    />
                  ) : (
                    medico.email
                  )}
                </TableCell>
                <TableCell>
                  {editing === medico.id ? (
                    <IconButton onClick={() => handleSave(medico.id)}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(medico.id)}>
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

export default EditMedico;
