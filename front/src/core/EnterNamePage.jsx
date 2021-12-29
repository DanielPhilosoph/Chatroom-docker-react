import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { validateName } from "../helper/functions";

export default function EnterNamePage() {
  const navigate = useNavigate();
  const nameInput = useRef();
  const errorRef = useRef();

  const onLoginClick = (e) => {
    e.preventDefault();
    const response = validateName(nameInput.current.value);
    if (response.valid) {
      // GOOD
      navigate("/chat-room");
    } else {
      errorRef.current.innerText = response.error;
    }
  };

  return (
    <div className="EnterNamePageDiv">
      <Form className="form">
        <h2>Login To Chat Room!</h2>
        <br />
        <Form.Group className="mb-3" aria-autocomplete="none">
          <Form.Label>Name</Form.Label>
          <Form.Control ref={nameInput} type="text" placeholder="Enter name" />
        </Form.Group>
        <p ref={errorRef} className="loginError" />
        <Button onClick={onLoginClick} type="submit" className="loginButton">
          Login
        </Button>
      </Form>
    </div>
  );
}
