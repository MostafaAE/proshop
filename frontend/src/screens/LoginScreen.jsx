import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useLoginMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector(state => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();

  let redirect = searchParams.get('redirect');

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) navigate(redirect || '/');
  }, [userInfo, redirect, navigate]);

  const submitHandler = async e => {
    e.preventDefault();
    console.log('submit');
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res?.data?.user }));
      navigate(redirect || '/');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `register?redirect=${redirect}` : '/signup'}>
            Sign up
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
