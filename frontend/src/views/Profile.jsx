import { Button, Container, Card, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HorizontalProductCard } from "../components/Cards";
import { Productos } from "../components/utils/Productos";
//import { useFavorites } from "../contexts/Context";

function Profile() {
  const navigate = useNavigate();
  // const { favorites } = useFavorites();

  // const productosDeseados = Productos.filter((producto) =>
  //   favorites.includes(producto.id)
  // );

  // const primerosDosDeseados = productosDeseados.slice(0, 2);

  const irASubir = () => {
    navigate(`/upload`);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center pt-5">
      <Card className="mb-3" style={{ minWidth: "450px" }}>
        <Row className="g-0">
          <Col md={4}>
            <Image src="..." className="img-fluid rounded-start" alt="..." />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>Nombre</Card.Title>
              <Card.Text>email</Card.Text>
              <Card.Text>telefono</Card.Text>
              <Button variant="primary" type="submit" className="w-auto">
                Actualizar datos
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Container className="d-flex flex-dir-col justify-content-center align-items-center m-5">
        <Card className="m-3 p-3">
          <Card.Title className="text-center">Lista de deseados</Card.Title>

          {/* {primerosDosDeseados.length > 0 ? (
            primerosDosDeseados.map((producto) => (
              <HorizontalProductCard key={producto.id} product={producto} />
            ))
          ) : (
            <p>No tienes productos en tu lista de deseados.</p>
          )} */}
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

          <HorizontalProductCard product={Productos[0]} />
          <HorizontalProductCard product={Productos[0]} />
        </Card>
      </Container>
    </Container>
  );
}

export default Profile;
