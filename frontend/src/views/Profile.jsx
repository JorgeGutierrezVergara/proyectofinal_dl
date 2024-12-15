import { Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HorizontalProductCard } from "../components/Cards";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);
  const [misProductos, setMisProductos] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        alert("Token no encontrado. Por favor, inicia sesión.");
        navigate("/login");
        return;
      }
      try {
        const [favoritosRes, misProductosRes, userRes] = await Promise.all([
          axios.get("http://localhost:3000/favoritos", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/mis_productos", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/usuarios", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setFavoritos(favoritosRes.data.result);
        setMisProductos(misProductosRes.data[0]);
        setUser(userRes.data[0]);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [navigate]);

  const irASubir = () => {
    navigate(`/upload`);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center pt-5">
      <Card className="mb-3" style={{ minWidth: "450px" }}>
        <Card.Body>
          <Card.Title>{user.nombre}</Card.Title>
          <div>
            <Card.Text>email: {user.email}</Card.Text>
            <Card.Text>telefono: {user.phone}</Card.Text>
          </div>
        </Card.Body>
      </Card>

      <Container className="d-flex flex-dir-col justify-content-center align-items-start m-5">
        <Card className="m-3 p-3">
          <Card.Title className="text-center">Lista de deseados</Card.Title>

          {favoritos.length > 0 ? (
            favoritos.map((producto) => (
              <HorizontalProductCard product={producto} key={producto.id} />
            ))
          ) : (
            <p>No tienes productos en tu lista de deseados.</p>
          )}
        </Card>

        <Card className="m-3 p-3">
          <Container className="d-flex align-items-center justify-content-center">
            <Card.Title className="text-center mb-0">
              Mis publicaciones
            </Card.Title>
            <Button
              onClick={irASubir}
              variant="primary"
              type="submit"
              className="ms-2 p-1"
            >
              +
            </Button>
          </Container>

          {misProductos.length > 0 ? (
            misProductos.map((producto) => (
              <HorizontalProductCard product={producto} key={producto.id} />
            ))
          ) : (
            <p>No tienes productos a la venta.</p>
          )}
        </Card>
      </Container>
    </Container>
  );
}

export default Profile;
