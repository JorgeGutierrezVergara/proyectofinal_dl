import { Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MainPageProductCard } from "../components/Cards";
import "../assets/style.css";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/productos")
      .then((response) => {
        setProductos(response.data[0]);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  // const agregarAFavoritos = (id) => {
  //   if (favorites.includes(id)) {
  //     removeFavorite(id);
  //   } else {
  //     addFavorite(id);
  //   }
  // // };

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
