// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PacientesList from './PacientesList';
import AddPaciente from './AddPacientes';
import DeletePaciente from './DeletePacientes';
import LoginPaciente from './LoginPaciente';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/listar" element={<PacientesList />} />
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
