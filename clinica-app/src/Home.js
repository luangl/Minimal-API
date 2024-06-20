// src/LandingPage.js
import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <h1>Bem-vindo à Clínica Hospitalar Moderna</h1>
          <p>Oferecendo cuidados médicos de qualidade com tecnologia de ponta.</p>
          <Link to="/adicionar">
            <button className="cta-button">Faça seu cadastro!</button>
          </Link>
          <Link to="/consultas">
            <button className="cta-button">Agende uma Consulta</button>
          </Link>
          <Link to="/exames">
            <button className="cta-button">Agende um exame! </button>
          </Link>
          <Link to="/medicos">
            <button className="cta-button">Sou médico.</button>
          </Link>
        </div>
      </header>
      <main className="content">
        <section className="about">
          <h2>Sobre Nós</h2>
          <p>
            Nossa clínica hospitalar é dedicada a fornecer cuidados médicos excepcionais com uma
            abordagem centrada no paciente. Nossa equipe de profissionais experientes utiliza a
            tecnologia mais avançada para garantir diagnósticos precisos e tratamentos eficazes.
          </p>
        </section>
        <section className="services">
          <h2>Nossos Serviços</h2>
          <ul>
            <li>Consultas Gerais</li>
            <li>Especialidades Médicas</li>
            <li>Exames Diagnósticos</li>
            <li>Cirurgias</li>
            <li>Atendimento de Emergência</li>
          </ul>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Clínica Hospitalar Moderna. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
