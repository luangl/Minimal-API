// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PacientesList from './PacientesFront/PacientesList';
import AddPaciente from './PacientesFront/AddPacientes';
import DeletePaciente from './PacientesFront/DeletePacientes';
import LoginPaciente from './LoginPaciente';
import Home from './Home';
import Pacientes from './PacientesFront/PacientesBotao'
import EditPaciente from './PacientesFront/EditPacientes';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/listar" element={<PacientesList />} />
            <Route path="/editarpaciente" element={<EditPaciente />} />
            <Route path="/paciente" element={<Pacientes />} />
            <Route path="/login" element={<LoginPaciente />} />
            <Route path="/adicionar" element={<AddPaciente />} />
            <Route path="/deletar" element={<DeletePaciente />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
