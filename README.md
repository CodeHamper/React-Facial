# React com reconhecimento facial

Projeto de reconhecimento facial usando React e Firebase.

- Login usando Firebase
- Cadastro de Face no Cloud Firestore
- Reconhecimento de Face e registro de entrada no Cloud Firestore

# Config Firebase

file `src/Config/index.js`

# Cloud Firestore

1 - Criar o banco antes de iniciar o projeto.

2 - Alterar a regras para para poder iniciar o testes.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write
    }
  }
}
```

# Authentication

Autenticar e gerenciar usuários para terem acesso.

1 - Ativar Email/Senha
2 - Na aba Users, adicionar o usuário para poder entrar no sistema.

## Start

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
