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
import AddMedico from './MedicosFront/AddMedicos';
import EditMedico from './MedicosFront/EditMedicos';
import DeleteMedico from './MedicosFront/DeleteMedicos';
import MedicosList from './MedicosFront/MedicosList';
import MedicosBotao from './MedicosFront/MedicosBotao'
import AddConsulta from './ConsultasFront/AddConsultas';
import DeleteConsulta from './ConsultasFront/DeleteConsultas';
import EditConsulta from './ConsultasFront/EditConsultas';
import ConsultasList from './ConsultasFront/ConsultasList';
import ConsultasBotao from './ConsultasFront/ConsultasBotao'
import AddExame from './ExamesFront/AddExames';
import EditExame from './ExamesFront/EditExames';
import DeleteExame from './ExamesFront/DeleteExames';
import ExamesList from './ExamesFront/ExamesList';
import ExamesBotao from './ExamesFront/ExamesBotao'


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
            <Route path="/adicionarmedico" element={<AddMedico />} />
            <Route path="/editarmedico" element={<EditMedico />} />
            <Route path="/excluirmedico" element={<DeleteMedico />} />
            <Route path="/listarmedico" element={<MedicosList />} />
            <Route path="/medicos" element={<MedicosBotao />} />
            <Route path="/adicionarconsulta" element={<AddConsulta />} />
            <Route path="/editarconsulta" element={<EditConsulta />} />
            <Route path="/excluirconsulta" element={<DeleteConsulta />} />
            <Route path="/listarconsulta" element={<ConsultasList />} />
            <Route path="/consultas" element={<ConsultasBotao />} />
            <Route path="/adicionarexames" element={<AddExame />} />
            <Route path="/editarexames" element={<EditExame />} />
            <Route path="/excluirexames" element={<DeleteExame />} />
            <Route path="/listarexames" element={<ExamesList />} />
            <Route path="/exames" element={<ExamesBotao />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
