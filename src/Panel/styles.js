import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #ededed;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
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

    .controle {
      @media screen and (max-width: 415px) {
        text-align: center;
        width: 90%;
        margin-top: 30px;
      }
      a {
        width: 200px;
        float: left;
        margin: 10px;
        background: #eee;
        cursor: pointer;
        text-align: center;
        color: #444;
        text-decoration: none;

        @media screen and (max-width: 415px) {
          float: none;
        }

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;
