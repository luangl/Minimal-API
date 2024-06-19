// src/UpdatePaciente.js
import React, { useState } from 'react';
import api from './api';

const UpdatePaciente = ({ id }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/${id}`, { nome, email, telefone, cpf })
      .then(response => {
        console.log('Paciente atualizado', response.data);
      })
      .catch(error => console.error('Erro ao atualizar paciente', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Atualizar Paciente</h2>
      <label>Nome: <input value={nome} onChange={e => setNome(e.target.value)} /></label>
      <label>Email: <input value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Telefone: <input value={telefone} onChange={e => setTelefone(e.target.value)} /></label>
      <label>CPF: <input value={cpf} onChange={e => setCpf(e.target.value)} /></label>
      <button type="submit">Atualizar</button>
    </form>
  );
};

export default UpdatePaciente;
