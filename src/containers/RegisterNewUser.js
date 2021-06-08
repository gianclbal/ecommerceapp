import React from "react";
import Axios from "axios";
import "./Login.css";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setPassword, setIsLoggedIn } from '../redux/actions/userActions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector(state => state.userReducer.username);
    const password = useSelector(state => state.userReducer.password);
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const [error, setError] = React.useState("");
    const [password2, setPassword2] = React.useState("");

    // const [username, setUsername] = React.useState("");
    // const [password, setPassword] = React.useState("");


    // const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleBackToSignIn = () => {
        let path = "/login";
        history.push(path);
    };

    const handleSignUp = () => {
        const body = {
            username: username,
            password: password,
        };
        if (password === password2) {
            Axios.post("/registerNewUser", body)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        dispatch(setIsLoggedIn(true));
                        return <Redirect to="/market" />;
                    } else {
                        alert(res.data.message);
                        setError(res.data.response);
                        console.log(res);
                    }
                });
        } else {
            alert("Passwords do not match.");
            console.log("Failed To Sign Up. Passwords do not match.");
        }
    };

    if (isLoggedIn) return <Redirect to="/" />;

    return (
        <div>
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                        type="username" 
                        placeholder="Enter a username"
                        value={username}
                        onChange={(e) => dispatch(setUserName(e.target.value))}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        placeholder="Repeat Password"
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        />
                    </Form.Group>
                  
                    <Button 
                    variant="primary" 
                    type="submit"
                    disabled={!username || !password || !password2 }
                    onClick={handleSignUp}
                    >
                        Sign Up
                 </Button>
                </Form>

                <p>Already Have An Existing Account?
            <Button variant='primary' onClick={handleBackToSignIn}> Login!</Button></p>
            </Container>

            {/* <form>
                <h1 className="center"> Sign Up </h1>
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
                />
                <input
                    placeholder="Repeat Password"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <button
                    disabled={!username || !password || !password2}
                    onClick={handleSignUp}
                >Sign Up</button>
                {error && <strong> {error} </strong>}
            </form> */}
            
        </div>
    );
};
export default SignUp;