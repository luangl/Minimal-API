import React from 'react';
import '../LandingPage.css';
import { Link } from 'react-router-dom';

const ConsultasBotao = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <h1>Bem-vindo à Clínica Hospitalar Moderna <p className="paciente">Consulta</p></h1>
          <p>Faça seu cadastro clicando no botão abaixo</p>
          <Link to="/adicionarconsulta">
            <button className="cta-button">Faça seu cadastro!</button>
          </Link>
          <div>
          <Link to="/listarconsulta">
            <button className="cta-button">Lista de Consultas Cadastradas</button>
          </Link>
          <Link to="/editarconsulta">
            <button className="cta-button">Editar Consultas</button>
          </Link>
          <Link to="/excluirconsulta">
            <button className="cta-button">Excluir Consultas</button>
          </Link>
          </div>
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

export default ConsultasBotao;
