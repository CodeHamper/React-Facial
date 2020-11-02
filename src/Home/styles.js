import styled from 'styled-components';

import Image from '../assets/novahome.jpg';
export const Container = styled.div`
  display: flex;
  justify-content: center;
  
  height: 100vh;
  align-items: center;

  &::after {
  content: "";
  background: url(${Image}) no-repeat center center fixed; 
  opacity: 0.6;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;  
  background-size: cover; 
}
  @media screen and (max-width: 415px) {
    display: inline-block;
  }

  .lado {
    width: 50%;
    background: rgba(107, 164, 252, 0.87);
    padding: 3%;
    border-radius: 6px;

    @media screen and (max-width: 415px) {
      width: 100%;
    }

    img {
      margin-top: 17%;
      text-align: center;

      @media screen and (max-width: 415px) {
        width: 100%;
      }
    }

    h1 {
      font-size: 2.5em;
      color: #FFF;
      margin-left: 15%;
      margin-right: 5%;

      @media screen and (max-width: 415px) {
        font-size: 2em;
        margin-left: 0;
        margin-right: 0;
        margin-top: 5%;
        text-align: center;
      }
    }
    p {
      font-size: 1.5em;
      color: #FFF;
      margin-left: 15%;
      margin-right: 5%;
    }

    .botoes {
      margin-left: 15%;
      margin-right: 5%;

      button {
        background: #fff;
        border: none;
        color: #444;
        font-size: 1em;
        padding: 15px 25px;
        border-radius: 5px;
        cursor: pointer;

        a {
          color: #444;
          text-decoration: none;
        }

        &:hover {
          opacity: 0.7;
        }
      }

      .entrar {
        margin-left: 8%;
      }
    }
  }
`;
