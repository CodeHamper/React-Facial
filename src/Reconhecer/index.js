import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import Webcam from 'react-webcam';
import { Container } from './styles';
import { withFirebase } from '../services/Firebase';
import MenuPanel from '../MenuPanel';
import { Helmet } from 'react-helmet';
import * as faceapi from 'face-api.js';
import { ToastContainer, toast } from 'react-toastify';

import { loadModels, getFullFaceDescription } from '../faceapi.js';

const WIDTH = 600;
//const WIDTH = window.innerWidth;
//const HEIGHT = window.innerHeight;
const HEIGHT = 600;

class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef(null);
    this.camera = '';
    this.state = {
      fullDesc: null,
      detections: null,
      descriptors: null,
      faceMatcher: null,
      match: 'Desconhecido',
      facingMode: null,
      listaalunos: null,
      verdadeiro: false,

      aluno: '',
      entradas: {},
    };
  }

  componentWillMount = async () => {
    await loadModels();
    // this.setState({ faceMatcher: await createMatcher(JSON_PROFILE) });
    // Create labeled descriptors of member from profile

    this.setInputDevice();
    this.props.firebase.listaPessoas().on('value', (snapshot) => {
      const lista = snapshot.val();

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
    });

    this.props.firebase.listaEntradas().on('value', (snapshot) => {
      const lista = snapshot.val();
      if (lista !== null) {
        let members = Object.values(lista);

        this.setState({ entradas: members });
      }
    });
  };

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async (devices) => {
      let inputDevice = await devices.filter(
        (device) => device.kind === 'videoinput'
      );
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: 'user',
        });
      } else {
        await this.setState({
          facingMode: { exact: 'environment' },
        });
      }
      this.startCapture();
    });
  };

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture();
    }, 2000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  capture = async () => {
    if (!!this.webcam.current) {
      const Foto = this.webcam.current.getScreenshot();

      if (Foto) {
        await getFullFaceDescription(
          this.webcam.current.getScreenshot(),
          224
        ).then((fullDesc) => {
          if (!!fullDesc) {
            this.setState({
              detections: fullDesc.map((fd) => fd.detection),
              descriptors: fullDesc.map((fd) => fd.descriptor),
            });
          }
        });
      } else {
        //console.log('n')
      }
      if (!!this.state.descriptors && !!this.state.faceMatcher) {
        let match = await this.state.descriptors.map((descriptor) =>
          this.state.faceMatcher.findBestMatch(descriptor)
        );
        if (typeof match[0] === 'object') {
          if (match[0]._label && match[0]._label !== 'unknown') {
            this.setState({ verdadeiro: true });

            this.setState({ aluno: match[0]._label });
            this.VerificaSeJaEntrou(match[0]._label);
          } else {
            this.setState({ verdadeiro: false });
          }
        }

        this.setState({ match });
      }
    }
  };

  VerificaSeJaEntrou = async (nome) => {
    //console.log(this.state.entradas)
    if (this.state.entradas.length > 0) {
      const EntrdaIndex = this.state.entradas.find(
        (entrada) => entrada.name === nome
      );
      //console.log(EntrdaIndex);
      if (!EntrdaIndex) {
        this.props.firebase.pessoas().child('entradas/').push({
          name: nome,
        });
        toast.success(`${nome} sua entrada registrada.`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(`${nome} sua entrada já foi registrada.`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      this.props.firebase.pessoas().child('entradas/').push({
        name: nome,
      });
      toast.success(`${nome} sua entrada registrada.`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  VerifcaVerde = () => {
    if (this.state.verdadeiro) {
      return 'rgb(108, 242, 61)';
    } else {
      return '#F74924';
    }
  };

  confirmar = () => {
    this.setState({ aluno: '' });
  };

  render() {
    const { detections, match, facingMode } = this.state;

    let videoConstraints = null;

    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: 'user',
      };
      if (facingMode === 'user') {
        this.camera = 'Front';
      } else {
        this.camera = 'Back';
      }
    }

    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height+30;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y+30;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: `10px dashed ${this.VerifcaVerde()}`,

                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`,
                zIndex: 9999999,
                marginTop: '-70px',
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: this.VerifcaVerde(),
                    border: 'dashed',
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
          <div className="controle">
            <div className="boxweb">
              {!!videoConstraints ? (
                <div style={{ position: 'absolute' }}>
                  <Webcam
                    audio={false}
                    width={WIDTH}
                    height={HEIGHT}
                    ref={this.webcam}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                </div>
              ) : null}
              {!!drawBox ? drawBox : null}
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withFirebase(withAuthorization(condition)(VideoInput));
