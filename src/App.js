/* eslint-disable require-jsdoc */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PageHome from './Home';
import SignInPage from './Login';

import PanelPage from './Panel';
import Reconhecer from './Reconhecer';

import CadastrarWebcam from './Cadastrar/WebCam';

import { withAuthentication } from './Session';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PageHome} />
        <Route path="/login" component={SignInPage} />

        <Route path="/panel" component={PanelPage} />
        <Route path="/cadastrar/webcam" component={CadastrarWebcam} />
        <Route path="/reconhecer" component={Reconhecer} />
        <Route path="*" component={SignInPage} />
      </Switch>
    </Router>
  );
}

export default withAuthentication(App);
