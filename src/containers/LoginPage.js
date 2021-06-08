import React from "react";
import Axios from "axios";
import "./Login.css";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserName, setPassword, setIsLoggedIn, setUserListing } from '../redux/actions/userActions';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BulkWriteError } from "mongodb";

const Login = ({ appUser, setAppUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.userReducer.user);
  const username = useSelector(state => state.userReducer.username);
  const password = useSelector(state => state.userReducer.password);
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  // const userListing = useSelector(state => state.userReducer.userListing);

  // const [username, setUsername] = React.useState("");
  // const [password, setPassword] = React.useState("");

  const divStyle = {
    color: 'blue',
    textDecoration: 'underline'
  };

  const [error, setError] = React.useState("");
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleSignUpClick = () => {
    let path = "/signup";
    history.push(path);
  };


  const handleLogin = (event) => {

    const body = {
      username: username,
      password: password,
    };

    event.preventDefault();
    Axios.post("/login", body)
      .then((res) => {
        //console.log(res.data);
        if (res.data.success === true) {
          // it worked
          dispatch(setIsLoggedIn(true));
          dispatch(setUser(res.data.user));
          return <Redirect to="/" />;
        } else {
          // Auth Error
          dispatch(setIsLoggedIn(false));
          setError(res.data.response);
          alert(res.data.response);
        }
      })
      .catch(() => {
        console.log("Failed to authenticate user")
        setError("Failed to authenticate user");
      });

    Axios.get(`/api/viewListings?ownerid=${user._id}`)
      .then((res) => {
        console.log("RES HERE IN APP")
        console.log(res);
        // dispatch(setUserListing(res.data.userItems));
      })
      .catch((e) => console.log('Failed to view list' + e));


  };


  return (
    <Container>
      <Row>
        <Col>
        <h2>Login to Ecommerce App</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => dispatch(setUserName(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!password || !username}>
              Submit
              </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <div>
            <p>Not signed up yet?</p>
            <Button varient="outline-primary" onClick={handleSignUpClick}>Create An Account</Button>{''}
          </div>
        </Col>
      </Row>
    </Container>

  );
};

export default Login;

{/* 
           
<form onSubmit={handleLogin} className="userForm">
        <h1 className="center"> Login </h1>
        <input
          placeholder="UserName"
          value={username}
          onChange={(e) => dispatch(setUserName(e.target.value))}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        ></input>
        <button className="button"
          type="submit"
          disabled={!username || !password}>
          Log In
            </button>
        {error && <strong> {error} </strong>}
      </form>

            <p>Not Signed Up Yet?</p>
            <button onClick={handleSignUpClick} className="button"> Sign Up! </button>
          </div> */}