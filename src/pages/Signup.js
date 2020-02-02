import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import logoImg from "../img/logo.gif";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Signup(props) {
  
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function postSignup() {

    if (password !== confirmPassword) {
      setIsError(true);
    }
    axios.post("https://www.somePlace.com/auth/signup", {
      userName,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to={"/"} />;
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value);
          }}
          placeholder="enter password again"
        />
        <Button onClick={postSignup}>Sign up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
        { isError &&<Error>The username is already taken</Error> }
    </Card>
  );
}

export default Signup;