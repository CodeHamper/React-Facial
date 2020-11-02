import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #ededed;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  display: flex;
  padding-bottom: 40px;

  .conteudo {
    background: #fff;
    width: 80%;
    padding: 40px;
    border-radius: 5px;

    .intro {
      h1 {
        font-size: 1.5em;
        font-weight: 400;
        text-transform: uppercase;
      }

      p {
        font-size: 1rem;
        line-height: 1.5;
      }
    }

    .basedi {
      display: flex;
      width: 100%;
    }

    .boxweb {
      width: 800px;
      height: 700px;

      margin-bottom: 20px;
    }
    .ladocamera {
      margin-left: 3%;
      p {
        font-size: 1.1em;
      }
      i {
        color: #000;
        font-size: 3em;
      }

      .error {
        background: #d64541;
        padding: 15px;
        color: #fff;
        border-radius: 4px;
        margin-top: 10px;
      }

      .success {
        background: #29f1c3;
        padding: 15px;
        color: #fff;
        border-radius: 4px;
        margin-top: 10px;
      }
    }

    label {
      color: #000;
      font-size: 1.1rem;
    }

    input {
      width: 400px;
      height: 40px;
      margin-bottom: 20px;
      margin-top: 20px;
      padding: 10px;
      color: #444;
      font-size: 1.1em;
    }

    button {
      font-size: 1em;
      color: #444;
      border: 0;
      padding: 10px 20px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
        background: #fff;
      }
    }

    .loading {
      color: #fff;
      font-size: 3rem;
    }
  }
`;
