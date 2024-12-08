import { Form, Button, Container } from "react-bootstrap";

function Upload() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center pt-5">
      <Form>
        <Form.Label>Subir publicación</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Control type="email" placeholder="Título" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="text" placeholder="Descripcion" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrecio">
          <Form.Control type="text" placeholder="Precio" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImg">
          <Form.Control type="text" placeholder="Enlace imagen" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Subir
        </Button>
      </Form>
    </Container>
  );
}

export default Upload;
