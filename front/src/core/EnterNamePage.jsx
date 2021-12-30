import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import { validateName } from "../helper/functions";
import { setUserNameAndId } from "../helper/actionsFunctions";

export default function EnterNamePage() {
  const navigate = useNavigate();
  const nameInput = useRef();
  const errorRef = useRef();
  const dispatch = useDispatch();

  const onLoginClick = (e) => {
    e.preventDefault();
    const response = validateName(nameInput.current.value);
    if (response.valid) {
      // ! Setting the name and the id to redux
      const id = nanoid();
      dispatch(setUserNameAndId(id, nameInput.current.value));
      localStorage.setItem(
        "info",
        JSON.stringify({ name: nameInput.current.value, id })
      );
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
