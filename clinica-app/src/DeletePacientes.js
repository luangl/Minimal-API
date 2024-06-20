import React, { useState } from 'react';
import { apiPacientes } from './api';

const DeletePaciente = () => {
  const [id, setId] = useState('');

  const handleDelete = () => {
    apiPacientes.delete(`/${id}`)
      .then(response => {
        console.log('Paciente deletado', response.data);
      })
      .catch(error => console.error('Erro ao deletar paciente', error));
  };

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o ID do Paciente"
        value={id}
        onChange={handleInputChange}
      />
      <button onClick={handleDelete}>Deletar Paciente</button>
    </div>
  );
};

export default DeletePaciente;
