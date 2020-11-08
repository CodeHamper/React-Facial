/* eslint-disable require-jsdoc */
import React from 'react';
import { Link } from 'react-router-dom';
import ParticlesBg from 'particles-bg';

import { Container } from './styles';

export default function Home() {
  return (
    <Container>
      <ParticlesBg color="#1c0bfd" type="cobweb" bg={true} />
      <div className="lado">
        <h1>Reconhecimento facial</h1>
        <p>Uma solução para você usar em sua empresa ou projeto</p>
        <div className="botoes">
          <button className="">
            <Link to="/login">Entrar</Link>
          </button>
        </div>
      </div>
    </Container>
  );
}
