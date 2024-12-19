import { Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MainPageProductCard } from "../components/Cards";
import "../assets/style.css";
import { ENDPOINT } from "../config/constans";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get(ENDPOINT.productos)
      .then((response) => {
        setProductos(response.data[0]);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center pt-5">
      <Row className="justify-content-center gx-4 gy-3">
        {productos.map((producto) => (
          <MainPageProductCard product={producto} key={producto.id} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
