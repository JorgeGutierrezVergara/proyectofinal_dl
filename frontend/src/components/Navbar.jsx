import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../contexts/Context";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const Navigation = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const logout = () => {
    setDeveloper();
    window.sessionStorage.removeItem("token");
    navigate("/");
  };

  const isLogin = () => {
    if (!getDeveloper) {
      return (
        <>
          <Nav.Link as={Link} to="/register">
            Registrarse
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        </>
      );
    }

    return (
      <>
        <Nav.Link as={Link} to="/profile">
          Mi perfil
        </Nav.Link>

        <Button variant="outline-danger" onClick={logout}>
          Salir
        </Button>
      </>
    );
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Marketplace
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="me-end">
          <Nav.Link as={Link} to="/">
            Inicio
          </Nav.Link>
          {isLogin()}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
