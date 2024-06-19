// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5136/pacientes', // Ajuste o URL base conforme necessário
});

export default api;
