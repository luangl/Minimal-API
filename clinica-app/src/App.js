// src/App.js
import React from 'react';
import './App.css';
import PacientesList from './PacientesList';
import AddPaciente from './AddPacientes';
import DeletePaciente from './DeletePacientes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestão de Pacientes</h1>
        <AddPaciente />
        <PacientesList />
        <DeletePaciente />
        {/* Aqui você pode adicionar exemplos de UpdatePaciente e DeletePaciente, passando os IDs apropriados */}
      </header>
    </div>
  );
}

export default App;
