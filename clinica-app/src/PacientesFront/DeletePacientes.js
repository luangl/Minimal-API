import React, { useState, useEffect } from 'react';
import { apiPacientes } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const DeletePacienteList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  useEffect(() => {
    apiPacientes.get('/')
      .then(response => {
        setPacientes(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar pacientes', error);
      });
  }, []);

  const handleClickOpen = (paciente) => {
    setSelectedPaciente(paciente);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPaciente(null);
  };

  const handleDelete = () => {
    apiPacientes.delete(`/${selectedPaciente.id}`)
      .then(response => {
        console.log('Paciente deletado', response.data);
        setPacientes(pacientes.filter(paciente => paciente.id !== selectedPaciente.id));
        handleClose();
      })
      .catch(error => console.error('Erro ao deletar paciente', error));
  };

  const filteredPacientes = pacientes.filter(paciente => 
    paciente.nome && paciente.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lista de Pacientes - Exclusão
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
                <TableCell>{paciente.nome}</TableCell>
                <TableCell>{paciente.telefone}</TableCell>
                <TableCell>{paciente.cpf}</TableCell>
                <TableCell>{paciente.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(paciente)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Confirmação de Exclusão"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o paciente {selectedPaciente?.nome}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DeletePacienteList;
