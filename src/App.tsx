import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Authentification } from './components/Authentification';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Error } from './types/Data';

type Item = {
  id: string;
  id_type: string;
};

type Latency = {
  latency: number;
};

function App() {
  const [infoItem, setInfoItem] = useState<Item>();
  const [latency, setLatency] = useState<Latency>();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<Error>();

  const info = async () =>
    await fetch('http://localhost:5000/auth/info', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then((res) => res.json())
      .then((result) => {
        try {
          setInfoItem(result);
        } catch (error) {
          console.log(error);
        }
      });

  const latencyOfServ = async () =>
    await fetch('http://localhost:5000/auth/latency', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setLatency(result);
        },
        (error) => {
          console.log(error);
        },
      );

  return (
    <div className='App'>
      <Container>
        <Row>
          <Col>
            <Authentification setIsLogin={setIsLogin} setError={setError} />
            <Row>
              <Col>
                <Button variant='primary' onClick={info}>
                  Info
                </Button>
              </Col>
              <Col>
                <Button variant='primary' onClick={latencyOfServ}>
                  Latency
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <div>
              <h1>ID:</h1>
              <h2>{infoItem?.id}</h2>
              <br />
              <h1>ID_TYPE:</h1>
              <h2>{infoItem?.id_type}</h2>
            </div>
          </Col>
          <Col>
            <div>
              <h1>Latency:</h1>
              <h2>{latency?.latency}</h2>
              <br />
            </div>
          </Col>
        </Row>
        {isLogin && <h1>You are entered now</h1>}
        {error && <h1>{error.message}</h1>}
      </Container>
    </div>
  );
}

export default App;
