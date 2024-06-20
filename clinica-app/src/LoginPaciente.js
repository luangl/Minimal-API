import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiPacientes } from './api'; // Importe sua API aqui

const LoginPaciente = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPacientes.post('/', { email, senha }) // Supondo que seu endpoint de login seja /login
      .then(response => {
        console.log('Login efetuado', response.data);
        setMessage('Login efetuado com sucesso!');
        setSeverity('success');
        setOpen(true);
        // Redirecionar para a página após o login
        navigate('/'); // Substitua '/dashboard' pelo seu caminho de rota após o login
      })
      .catch(error => {
        console.error('Erro ao fazer login', error);
        setMessage('Email ou senha incorretos. Tente novamente.');
        setSeverity('error');
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Faça seu login
        </Typography>
        <form onSubmit={handleSubmit}>
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
            label="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            fullWidth
            margin="normal"
            type="password"
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
            Entrar
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

export default LoginPaciente;
