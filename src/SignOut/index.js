import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../services/Firebase';

const SignOutButton = ({ firebase }) => (
  <Link to='#' onClick={firebase.doSignOut}>
    Sair
  </Link>
);

export default withFirebase(SignOutButton);
