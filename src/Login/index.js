import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../routes';
import { withFirebase } from '../services/Firebase';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticlesBg from 'particles-bg';

import {
  FormLabel,
  FormInput,
  FormInputPre,
  BotaoEntrar,
  CaixaCentro,
  Container
} from "./styles";



const SignInPage = () => (

  <Container>
    <ParticlesBg color="#07cff6" type="cobweb" bg={true} />
    <Helmet>
        <link href="/fontawesome/css/all.css" rel="stylesheet"></link>
    </Helmet>
    <ToastContainer />
      <CaixaCentro>
          <h3>Bem vindo</h3>
          <p>Digite seus dados para entrar</p>
          <SignInForm />
  
      </CaixaCentro>
   
  </Container>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  
  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        //this.setState({ error });

        if(error.code === 'auth/invalid-email'){
          toast.error("Email inválido !", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        else if(error.code === 'auth/user-not-found'){
          toast.error("Usuário não encontrado!", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        else if(error.code === 'auth/wrong-password'){
          toast.error("Senha inválida!", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        else{
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT
          });
        }

      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      
      <form onSubmit={this.onSubmit}>
        <FormLabel>Email</FormLabel>
        <FormInput>
          <FormInputPre>
          <span ><i className="far fa-user"></i></span>
          </FormInputPre>
          <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="name@exemple.com"
          required
        />
        </FormInput><br></br>
        <FormLabel>Senha</FormLabel>

        <FormInput>
          <FormInputPre>
          <span ><i className="fas fa-key"></i></span>
          </FormInputPre>
          <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          required
        />
        
        </FormInput>
        <br></br>
       
        <BotaoEntrar disabled={isInvalid} type="submit">
          Entrar
        </BotaoEntrar>
        <br></br>
      </form>
    );
  }
}


const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);



export default SignInPage;

export { SignInForm };
