import React, { useState, useEffect } from 'react';
import { apiConsultas } from '../api';
import { Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const DeleteConsulta = () => {
  const [consultas, setConsultas] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState(null);

  useEffect(() => {
    apiConsultas.get('/')
      .then(response => setConsultas(response.data))
      .catch(error => console.error('Erro ao buscar consultas', error));
  }, []);

  const handleClickOpen = (consulta) => {
    setSelectedConsulta(consulta);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedConsulta(null);
  };

  const handleDelete = () => {
    apiConsultas.delete(`/${selectedConsulta.id}`)
      .then(response => {
        console.log('Consulta deletada', response.data);
        setConsultas(consultas.filter(consulta => consulta.id !== selectedConsulta.id));
        handleClose();
      })
      .catch(error => console.error('Erro ao deletar consulta', error));
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
                <TableCell>{consulta.descricao}</TableCell>
                <TableCell>{consulta.data}</TableCell>
                <TableCell>{consulta.horario}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(consulta)}>
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
            Tem certeza que deseja excluir a consulta {selectedConsulta?.descricao}?
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

export default DeleteConsulta;
