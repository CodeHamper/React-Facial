import styled from "styled-components";

export const Container = styled.div `
  .conteudo {
    width: 100%;
    
    video {
      z-index: -1;
      margin-top: -50px;
    }
   }

   .modal {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
}

.modal-main {
  position:fixed;
  background: white;
  width: 80%;
  padding: 10%;
  height: auto;
  color: #000;
  top:50%;
  text-align: center;
  left:50%;
  transform: translate(-50%,-50%);

  h3 {
    font-size: 3rem;
  }

  button {
    border:0;
    background: rgb(108, 242, 61);
    padding: 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 2rem;
    color: #fff;
  }
}
`;