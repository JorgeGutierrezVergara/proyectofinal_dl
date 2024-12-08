import { Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Productos } from "../components/utils/Productos";

function Detail() {
  const { id } = useParams();
  const producto = Productos.find((item) => item.id === id);

  if (!producto) {
    return (
      <Container className="d-flex justify-content-center align-items-center pt-5">
        <h3>Producto no encontrado</h3>
      </Container>
    );
  }

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center pt-5">
        <Card className="mb-3" style={{ width: "auto" }}>
          <Row className="g-0">
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
            <Col md={7}>
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
