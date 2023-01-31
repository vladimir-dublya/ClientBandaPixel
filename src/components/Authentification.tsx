import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Data, Error } from '../types/Data';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
  setIsLogin: (arg: boolean) => void;
  setError: (arg: Error) => void;
};

export const Authentification: React.FC<Props> = ({ setIsLogin, setError }) => {
  const [data, setData] = useState<Data>({ id: '', password: '' });

  const login = async (event: React.FormEvent<HTMLButtonElement>) => {
    try {
      const response = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setError({ message: '' });
        setIsLogin(true);
        return await response.json();
      } else {
        response.json().then((message) => setError(message));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (event: React.FormEvent<HTMLButtonElement>) => {
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setError({ message: '' });
        setIsLogin(true);
        return await response.json();
      } else {
        response.json().then((message) => setError(message));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          onChange={(event) => {
            setData({ ...data, id: event.target.value });
          }}
          placeholder='Enter email'
        />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          onChange={(event) => {
            setData({ ...data, password: event.target.value });
          }}
          placeholder='Password'
        />
      </Form.Group>
      <Container>
        <Row>
          <Col>
            <Button variant='primary' onClick={login} type='button'>
              Login
            </Button>
          </Col>
          <Col>
            <Button variant='primary' onClick={register} type='button'>
              Register
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
