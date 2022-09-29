import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function AddTraineeModal({ show, onHide }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, country, email, status);
    await axios.post('https://tenxdapp.herokuapp.com/api/v1/trainees', {
      name,
      email,
      country,
      status,
    });
    onHide();
    alert('Trainee added successfully!');
    window.location.reload(true);
  };
  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Add Trainee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="abebe"
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="xyx@host.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Country</Form.Label>

            <Form.Control
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Ethiopia"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Status</Form.Label>

            <Form.Control
              type="text"
              onChange={(e) => setStatus(e.target.value)}
              placeholder="pass/fail"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={(e) => handleSubmit(e)}
        >
          Add Trainee
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTraineeModal;
