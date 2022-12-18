import React from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { updateLoggedIn } from "./ducks/LoginReducer";
import { Navigate, redirect } from "react-router";

function App() {

  const dispatch = useDispatch()
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [idError, setIdError] = useState('')
  const [nameError, setNameError] = useState('')
  const loggedIn = useSelector(state=> state.loginReducer.loggedIn)
  // const loggedIn = sessionStorage.getItem("_redux_state_data") ? JSON.parse(sessionStorage.getItem("_redux_state_data")).loginReducer.loggedIn : false
  const handleValidation = () => {
    let nameError = ""
    let idError = ""
    let validated = true
    // id
    if (id == "") {
      validated = false
      idError = 'Id is required'
    }

    // name
    if (name == "") {

      validated = false
      nameError = 'Name is required'
    }
    if (name != "") {
      if (name.length < 3) {
        validated = false
        nameError = 'Name needs to have atleast 3 characters'
      }
    }

    setNameError(nameError)
    setIdError(idError)
    return validated
  }

  const handleLogin = () => {
    if (handleValidation()) {
      login()
    }
  }

  const login = () => {
    dispatch(updateLoggedIn({ loggedIn: true, userName: name }))
  }

console.log("icbxiciubiusdf", loggedIn)

  return (
    <>
    {loggedIn && <Navigate to="/dashboard"/>}
    <div className="main-background login-background" onKeyDown={(e)=> {
      if (e.key === "Enter") {
        handleLogin()
      }
    }}>
      <Card className="login-card" id="login-card">
        <Card.Body>
          <div className="login-title">Login</div>
          <InputGroup className="login-fields">
            <Form.Control
              placeholder="Id"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </InputGroup>
          <span className="error-msg">{idError}</span>
          <div style={{ height: '8px' }}></div>
          <InputGroup className="login-fields m-top-5">
            <Form.Control
              placeholder="Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          <span className="error-msg">{nameError}</span>
          <div>
            <Button className="login-button" variant="primary" onClick={handleLogin}>Login</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
    </>
  );
}

export default App;
