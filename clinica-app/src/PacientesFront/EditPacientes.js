import React, { useState, useEffect } from 'react';
import { apiPacientes } from '../api';
import { Container, TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';

const PacienteList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    apiPacientes.get('/')
      .then(response => {
        setPacientes(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar pacientes', error);
      });
  }, []);

  const handleEdit = (id) => {
    setEditing(id);
  };

  const handleSave = (id) => {
    const paciente = pacientes.find(p => p.id === id);
    apiPacientes.put(`/${id}`, paciente)
      .then(response => {
        console.log('Paciente atualizado', response.data);
        setEditing(null);
      })
      .catch(error => {
        console.error('Erro ao atualizar paciente', error);
      });
  };

  const handleChange = (id, field, value) => {
    setPacientes(pacientes.map(paciente => 
      paciente.id === id ? { ...paciente, [field]: value } : paciente
    ));
  };

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
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPacientes.map(paciente => (
              <TableRow key={paciente.id}>
                <TableCell>
                  {editing === paciente.id ? (
                    <TextField
                      value={paciente.nome}
                      onChange={e => handleChange(paciente.id, 'nome', e.target.value)}
                    />
                  ) : (
                    paciente.nome
                  )}
                </TableCell>
                <TableCell>
                  {editing === paciente.id ? (
                    <TextField
                      value={paciente.telefone}
                      onChange={e => handleChange(paciente.id, 'telefone', e.target.value)}
                    />
                  ) : (
                    paciente.telefone
                  )}
                </TableCell>
                <TableCell>
                  {editing === paciente.id ? (
                    <TextField
                      value={paciente.cpf}
                      onChange={e => handleChange(paciente.id, 'cpf', e.target.value)}
                    />
                  ) : (
                    paciente.cpf
                  )}
                </TableCell>
                <TableCell>
                  {editing === paciente.id ? (
                    <TextField
                      value={paciente.email}
                      onChange={e => handleChange(paciente.id, 'email', e.target.value)}
                    />
                  ) : (
                    paciente.email
                  )}
                </TableCell>
                <TableCell>
                  {editing === paciente.id ? (
                    <IconButton onClick={() => handleSave(paciente.id)}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(paciente.id)}>
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

export default PacienteList;
