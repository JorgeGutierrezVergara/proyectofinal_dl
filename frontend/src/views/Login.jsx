import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import axios from "axios";
import React, { useState, useContext } from "react";
import Context from "../contexts/Context";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constans";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setDeveloper } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(ENDPOINT.login, {
        email,
        password,
      });
      const token = response.data.token;
      window.sessionStorage.setItem("token", token);
      setDeveloper({});
      navigate("/profile");
    } catch (err) {
      setError("Credenciales incorrectas o error en el servidor.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center pt-5">
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar sesión</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
