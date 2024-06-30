// src/DeleteMedico.js
import React, { useState, useEffect } from 'react';
import { apiExames } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const DeleteMedico = () => {
  const [exames, setExames] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedExame, setSelectedMedico] = useState(null);

  useEffect(() => {
    apiExames.get('/')
      .then(response => setExames(response.data))
      .catch(error => console.error('Erro ao buscar médicos', error));
  }, []);

  const handleClickOpen = (exame) => {
    setSelectedMedico(exame);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMedico(null);
  };

  const handleDelete = () => {
    apiExames.delete(`/${selectedExame.id}`)
      .then(response => {
        console.log('Exame deletado', response.data);
        setExames(exames.filter(exame => exame.id !== selectedExame.id));
        handleClose();
      })
      .catch(error => console.error('Erro ao deletar médico', error));
  };

  const filteredExames = exames.filter(exame =>
    exame.tipo && exame.tipo.toLowerCase().includes(search.toLowerCase())
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
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(exame)}>
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
            Tem certeza que deseja excluir o médico {selectedExame?.tipo}?
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
