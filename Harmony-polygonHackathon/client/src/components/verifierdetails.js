import React from "react";
import { Button, Card, Container, FloatingLabel, Form, ListGroup } from "react-bootstrap";

const VerifierDetails = () => {
  return (
    <div>
      <Container className="mt-5" style={{ width: "60rem" }}>
        <Form>
          <h4>This is where you can create your Chama</h4>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <FloatingLabel
              controlId="floatingInput"
              label="Kindly enter your first premium account."
              className="mb-3"
            >
              <Form.Control type="number" placeholder="0.333Eth" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default VerifierDetails;
