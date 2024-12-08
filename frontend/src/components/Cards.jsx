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
