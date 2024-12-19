import { Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/constans";

function Detail() {
  const { id } = useParams();
  const [producto, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get(`${ENDPOINT.productos}/${id}`)
      .then((response) => {
        setProductos(response.data[0]);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  if (!producto) {
    return (
      <Container className="d-flex justify-content-center align-items-center pt-5">
        <h3>Producto no encontrado</h3>
      </Container>
    );
  }

  return (
    <>
      <Container className="d-flex justify-content-center pt-5">
        <Card
          className="mb-3"
          style={{
            width: "80%",
          }}
        >
          <Row
            className="g-0"
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Col md={5}>
              <Image
                src={producto.img}
                className="img-fluid rounded-start"
                alt={producto.title}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "contain",
                }}
              />
            </Col>
            <Col md={7} style={{ width: "40%" }}>
              <Card.Body>
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text>Precio: {producto.price}</Card.Text>
                <Button>Comprar</Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default Detail;
