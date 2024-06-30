// src/DeleteMedico.js
import React, { useState, useEffect } from 'react';
import { apiMedicos } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const DeleteMedico = () => {
  const [medicos, setMedicos] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedMedico, setSelectedMedico] = useState(null);

  useEffect(() => {
    apiMedicos.get('/')
      .then(response => setMedicos(response.data))
      .catch(error => console.error('Erro ao buscar médicos', error));
  }, []);

  const handleClickOpen = (medico) => {
    setSelectedMedico(medico);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMedico(null);
  };

  const handleDelete = () => {
    apiMedicos.delete(`/${selectedMedico.id}`)
      .then(response => {
        console.log('Médico deletado', response.data);
        setMedicos(medicos.filter(medico => medico.id !== selectedMedico.id));
        handleClose();
      })
      .catch(error => console.error('Erro ao deletar médico', error));
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
                <TableCell>{medico.nome}</TableCell>
                <TableCell>{medico.telefone}</TableCell>
                <TableCell>{medico.cpf}</TableCell>
                <TableCell>{medico.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(medico)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmação de Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o médico {selectedMedico?.nome}?
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

export default DeleteMedico;
