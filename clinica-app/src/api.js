import axios from 'axios';

// Instância para a API de Pacientes
const apiPacientes = axios.create({
  baseURL: 'http://localhost:5136/pacientes',
});

// Instância para a API de Médicos
const apiMedicos = axios.create({
  baseURL: 'http://localhost:5136/medicos',
});

// Instância para a API de Consultas
const apiConsultas = axios.create({
  baseURL: 'http://localhost:5136/consultas',
});

const apiExames = axios.create({
  baseURL: 'http://localhost:5136/exames',
});

// Exporta as instâncias para uso em outras partes do aplicativo
export { apiPacientes, apiMedicos, apiConsultas, apiExames };
