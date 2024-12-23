import { Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Context from "../contexts/Context";
import axios from "axios";

export const HorizontalProductCard = ({ product }) => {
  const navigate = useNavigate();

  const irAProducto = (id) => {
    navigate(`/producto/${id}`);
  };
  return (
    <Card
      className="m-3"
      key={product.producto_id}
      style={{ minWidth: "540px" }}
    >
      <Row className="g-0">
        <Col md={4}>
          <Card.Title className="text-center">{product.title}</Card.Title>
          <Image
            src={product.img}
            className="img-fluid rounded-start"
            alt={product.id}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Container className="d-flex flex-column align-items-end">
              <Card.Title>{product.title}</Card.Title>
              <Button
                variant="primary"
                type="button"
                className="w-auto m-2"
                style={{ minWidth: "80px" }}
                onClick={() => irAProducto(product.producto_id)}
              >
                Ver
              </Button>
              <Button
                variant="danger"
                type="button"
                className="w-auto m-2"
                style={{ minWidth: "80px" }}
              >
                Eliminar
              </Button>
            </Container>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export const MainPageProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { getDeveloper } = useContext(Context);
  const navigate = useNavigate();

  const checkIfFavorite = async () => {
    if (!getDeveloper) return;
    try {
      const token = window.sessionStorage.getItem("token");
      const { data } = await axios.get(`${ENDPOINT.favoritos}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFavorited(data.isFavorite);
    } catch (err) {
      console.error("Error al verificar favoritos:", err);
    }
  };
  useEffect(() => {
    checkIfFavorite();
  }, [getDeveloper]);

  const handleClick = async () => {
    if (!getDeveloper) {
      alert("Inicia sesión para guardar tus productos favoritos");
      return;
    }
    try {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        alert("Token no encontrado. Inicia sesión nuevamente.");
        return;
      }
      if (isFavorited) {
        await axios.delete(`${ENDPOINT.favoritos}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(
          `${ENDPOINT.favoritos}/${id}`,
          { producto_id: product.id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error("Error al gestionar favoritos:", err);
      alert("Hubo un error al gestionar favoritos");
    }
  };

  const irAProducto = (id) => {
    navigate(`/producto/${id}`);
  };

  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return text;
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-3">
      <Card
        id={product.id}
        border="dark"
        text="dark"
        className="d-flex flex-column product-card"
        onClick={() => irAProducto(product.id)}
      >
        <Card.Img
          variant="top"
          src={product.img}
          style={{
            width: "100%",
            height: "8rem",
            objectFit: "contain",
            backgroundColor: "#f8f9fa",
          }}
        />
        <Card.Body>
          <Card.Title>{truncateText(product.title)}</Card.Title>
          <div className="d-flex align-items-center">
            <span>{"$ " + product.price}</span>
            <div
              className="favorite-button-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={`favorite-button ${isFavorited ? "favorited" : ""}`}
                onClick={handleClick}
              >
                {isFavorited ? "♥" : "♡"}
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
