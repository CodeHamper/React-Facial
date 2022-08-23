import app from 'firebase/app';

import 'firebase/auth'; // for authentication

import 'firebase/database'; // for realtime database
import 'firebase/storage';

import config from '../../Config';

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  faceStorage = () => this.storage.ref();

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  pessoas = () => this.db.ref();
  listaPessoas = () => this.db.ref('alunos');
  listaEntradas = () => this.db.ref('entradas');
}

export default Firebase;
