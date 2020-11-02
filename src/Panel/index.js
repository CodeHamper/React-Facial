import React from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../Session';
import { Container } from './styles';

import MenuPanel from '../MenuPanel';

import ImgAddface from '../assets/addface.jpg';
import ImgScanface from '../assets/scanface.jpg';


const PanelPage = () => (
  <Container>
    <MenuPanel />
    <div className="conteudo">
      <div className="intro">
        <h1>Painel de controle</h1>
        <p>Selecione uma das opções abaixo:</p>

        <p>
          - Adicionar : Adicione um novo rosto na galeria
          <br />
          - Reconhecer: Verifique o rosto corresponde a um cadastrado na galeria
          <br />
        </p>
      </div>
      <div className="controle">
        <Link to="/cadastrar/webcam">
          <img src={ImgAddface} alt="" />
          <p>Adicionar</p>
        </Link>

        <Link to="/reconhecer">
          <img src={ImgScanface} alt="" />
          <p>Reconhecer</p>
        </Link>
      </div>
    </div>
  </Container>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(PanelPage);
