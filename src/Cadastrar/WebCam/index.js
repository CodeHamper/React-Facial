import React, { Component } from 'react';
import { withAuthorization } from '../../Session';
import Webcam from 'react-webcam';
import { Container } from './styles';
import { withFirebase } from '../../services/Firebase';
import MenuPanel from '../../MenuPanel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import * as faceapi from 'face-api.js';
import { loadModels, getFullFaceDescription } from '../../faceapi.js';

const videoConstraints2 = {
  width: 700,
  height: 700,
  facingMode: 'user',
};

class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef(null);

    this.state = {
      fullDesc: null,
      detections: null,
      descriptors: null,
      faceMatcher: null,
      match: null,
      cadas: null,
      verdadeiro: false,
      nomealuno: '',
      loading: false,
      rosto: false,
    };
  }

  componentWillMount = async () => {
    //Careegando modelos
    await loadModels();

    //this.setInputDevice();
    //this.startCapture();

    //Carregando lista de alunos no banco
    this.props.firebase.listaAlunos().on('value', (snapshot) => {
      const lista = snapshot.val();

      if (lista !== null) {
        let members = Object.keys(lista);
        let labeledDescriptors = members.map(
          (key) =>
            new faceapi.LabeledFaceDescriptors(
              lista[key].name,
              lista[key].descriptors.map(
                (descriptor) => new Float32Array(descriptor)
              )
            )
        );

        // Create face matcher (maximum descriptor distance is 0.5)
        let faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5);

        this.setState({ faceMatcher: faceMatcher });
      }
    });
  };

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture();
    }, 5000);
  };

  componentWillUnmount() {
    //clearInterval(this.interval);
  }

  capture = async () => {
    if (!!this.webcam.current) {
      const Foto = this.webcam.current.getScreenshot();

      if (Foto) {
        await getFullFaceDescription(
          this.webcam.current.getScreenshot(),
          512
        ).then((fullDesc) => {
          if (!!fullDesc) {
            this.setState({
              cadas: fullDesc.map((fd) => fd.descriptor),
              detections: fullDesc.map((fd) => fd.detection),
              descriptors: fullDesc.map((fd) => fd.descriptor),
            });
            this.setState({ rosto: true });
          }
        });
      } else {
        //console.log('n')
        this.setState({ rosto: false });
      }
      if (!!this.state.descriptors && !!this.state.faceMatcher) {
        let match = await this.state.descriptors.map((descriptor) =>
          this.state.faceMatcher.findBestMatch(descriptor)
        );

        if (typeof match[0] === 'object') {
          if (match[0]._label && match[0]._label !== 'unknown') {
            this.setState({ verdadeiro: true });

            this.setState({ aluno: match[0]._label });
          } else {
            this.setState({ verdadeiro: false });
          }
        }

        this.setState({ match });
      }
    }
    this.setState({ loading: false });
  };

  cadastra = async () => {
    if (this.state.verdadeiro) {
      toast.error('Aluno já cadastrado', {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      if (this.state.descriptors === null) {
        toast.error('Dados da face não reconhecido', {
          position: toast.POSITION.TOP_LEFT,
        });
      } else {
        if (this.state.nomealuno === '') {
          toast.error('Preencha um nome', {
            position: toast.POSITION.TOP_LEFT,
          });
        } else {
          this.props.firebase.alunos().child('alunos/').push({
            name: this.state.nomealuno,
            descriptors: this.state.descriptors,
          });

          toast.success(
            `Aluno ${this.state.nomealuno} cadastrado com sucesso`,
            {
              position: toast.POSITION.TOP_CENTER,
              onClose: () => this.props.history.push('/panel'),
            }
          );
        }
      }
    }
  };

  VerifcaVerde = () => {
    if (this.state.verdadeiro) {
      return 'rgb(108, 242, 61)';
    } else {
      return '#F74924';
    }
  };

  reconheceraluno = () => {
    this.setState({ loading: true });
    this.capture();
  };

  render() {
    const { detections, match, nomealuno } = this.state;
    // console.log('cadastra', this.props);

    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: `10px solid ${this.VerifcaVerde()}`,
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`,
                zIndex: 9999999,
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: this.VerifcaVerde(),
                    border: 'solid',
                    borderColor: this.VerifcaVerde(),
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`,
                    fontSize: '30px',
                    zIndex: 9999999,
                  }}
                >
                  {match[i]._label === 'unknown'
                    ? 'Desconhecido'
                    : match[i]._label}
                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }

    return (
      <Container>
        <Helmet>
          <link href="/fontawesome/css/all.css" rel="stylesheet"></link>
        </Helmet>
        <ToastContainer />
        <MenuPanel />
        <div className="conteudo">
          <div className="intro">
            <h1>Cadastrar rosto para reconhecimento</h1>
            <p>
              1 - Cadastre no nome completo do aluno <br />
              2 - Foque no rosto do aluno para cadastro, e clique em capiturar.
              <br />
            </p>
          </div>

          <div className="controle">
            <div className="nomealuno">
              <label>Nome do aluno:</label>
              <br />
              <input
                type="text"
                placeholder="Digite o nome do aluno"
                onChange={(e) => this.setState({ nomealuno: e.target.value })}
                value={nomealuno}
              />
            </div>
            <hr />
            <div className="basedi">
              <div className="boxweb">
                <div style={{ position: 'absolute' }}>
                  <Webcam
                    audio={false}
                    width={700}
                    height={700}
                    ref={this.webcam}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints2}
                  />
                </div>
                {!!drawBox ? drawBox : null}
              </div>
              <div className="ladocamera">
                <p>
                  1 - Olhe para a cåmera <br />
                  2 - Clique no botão reconher aluno <br />
                </p>

                {this.state.loading ? (
                  <div className="loade">
                    <i className="fas fa-spinner fa-pulse"></i>
                  </div>
                ) : (
                  <button onClick={this.reconheceraluno}>
                    RECONHECER ALUNO
                  </button>
                )}

                <br />
                {this.state.rosto ? (
                  this.state.verdadeiro ? (
                    <div className="error">
                      <p>Rosto já cadastrado. Tente outro aluno.</p>
                    </div>
                  ) : (
                    <>
                      <div className="success">
                        <p>Rosto Reconhecido e disponivel para cadastro.</p>
                      </div>
                      <br />
                      <button onClick={this.cadastra}>Cadastrar</button>
                    </>
                  )
                ) : (
                  <div className="error">
                    <p>Nenhum rosto reconhecido. Tente novamente.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withFirebase(withAuthorization(condition)(VideoInput));
