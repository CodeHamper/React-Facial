/* eslint-disable require-jsdoc */
import React from 'react';
import { Link } from 'react-router-dom';
import ParticlesBg from 'particles-bg';

import { Container } from './styles';

export default function Home() {
  return (
    <Container>
      <ParticlesBg color="#07cff6" type="cobweb" bg={true} />
      <div className="lado">
        <h1>Reconhecimento facial</h1>
        <p>
          Soluções para sua empresa, entre em contato para solicitar acesso para
          começar a utilizar esta solução.
        </p>
        <div className="botoes">
          <button>
            <a href="#">Contato</a>
          </button>
          <button className="entrar">
            <Link to="/login">Entrar</Link>
          </button>
        </div>
      </div>
    </Container>
  );
}
