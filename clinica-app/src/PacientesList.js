// src/PacientesList.js
import React, { useEffect, useState } from 'react';
import {apiPacientes} from './api';

const PacientesList = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    apiPacientes.get('/')
      .then(response => setPacientes(response.data))
      .catch(error => console.error('Erro ao buscar pacientes', error));
  }, []);

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <ul>
        {pacientes.map(paciente => (
          <li key={paciente.id}>
            {paciente.nome} - {paciente.email} - {paciente.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PacientesList;
