import React, { useState } from 'react';
import { apiPacientes } from '../api';
import { Container, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddPaciente = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState(''); // Novo estado para a senha
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPacientes.post('/', { nome, email, telefone, cpf, senha })
      .then(response => {
        console.log('Paciente adicionado', response.data);
        setMessage('Paciente adicionado com sucesso!');
        setSeverity('success');
        setOpen(true);
      })
      .catch(error => {
        console.error('Erro ao adicionar paciente', error);
        setMessage('Erro ao adicionar paciente. Tente novamente.');
        setSeverity('error');
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Faça seu cadastro e consulte!
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          
          <TextField
            label="Telefone"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="email"
          />
          <TextField
            label="Senha" // Novo campo para a senha
            value={senha}
            onChange={e => setSenha(e.target.value)}
            fullWidth
            margin="normal"
            type="password"
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
            Cadastrar
          </Button>
        </form>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{severity === 'success' ? 'Sucesso' : 'Erro'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AddPaciente;
