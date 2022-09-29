/* global AlgoSigner */

import { useState } from 'react';
import { Modal, Form, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';

function AddressModal({ show, onHide }) {
  const [address, setAddress] = useState('');
  const [accounts, setAccounts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log();
    // window.location.reload(true);
  };
  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Select Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="abebe"
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Form.Group> */}

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>
            <Dropdown.Menu>{/* <AccountList /> */}</Dropdown.Menu>

            {/* <Dropdown.Item lick={(e) => setAddress(e.target.value)}>
                Action
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item hreonCf="#/action-3">Something else</Dropdown.Item> */}
            {/* </Dropdown.Menu> */}
          </Dropdown>
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
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddressModal;
