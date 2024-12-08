import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useFavorites } from "../contexts/Context";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    axios
      .get("http://localhost:3000/productos")
      .then((response) => {
        setProductos(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setLoading(false);
      });
  }, []);

  const irAProducto = (id) => {
    console.log(`Ir a producto con ID: ${id}`);
  };

  // const agregarAFavoritos = (id) => {
  //   if (favorites.includes(id)) {
  //     removeFavorite(id);
  //   } else {
  //     addFavorite(id);
  //   }
  // };
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center pt-5">
      <Row className="justify-content-center gx-4 gy-3">
        {productos.map((producto) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={producto.id} // Se usa producto.id aquí
            className="mb-3"
          >
            <Card
              id={producto.id}
              border="dark"
              text="dark"
              className="d-flex flex-column"
              style={{ width: "18rem", height: "28rem" }}
            >
              <Card.Img
                variant="top"
                src={producto.img}
                style={{
                  width: "100%",
                  height: "12rem",
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa",
                }}
              />
              <Card.Body>
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <div className="d-flex justify-content-between mt-3">
                  <Button onClick={() => irAProducto(producto.id)}>
                    Ver producto
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
