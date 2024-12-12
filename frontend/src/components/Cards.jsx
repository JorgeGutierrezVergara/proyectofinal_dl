import { Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const HorizontalProductCard = ({ product }) => {
  const navigate = useNavigate();
  const irAProducto = (id) => {
    navigate(`/producto/${id}`);
  };
  return (
    <Card className="m-3" style={{ minWidth: "540px" }}>
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
              <Button
                variant="primary"
                type="button"
                className="w-auto m-2"
                style={{ minWidth: "80px" }}
                onClick={() => irAProducto(product.id)}
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
  const navigate = useNavigate();
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
          <Card.Text>{"$ " + product.price}</Card.Text>
          {/* <div className="d-flex justify-content-between mt-3">
            <Button onClick={() => irAProducto(producto.id)}>
              Ver producto
            </Button>
          </div> */}
        </Card.Body>
      </Card>
    </Col>
  );
};
