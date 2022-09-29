/* global AlgoSigner */

import React, { useEffect, useState } from 'react';
import TraineeList from '../components/TraineeList/TraineeList';
import OptinList from '../components/OptinList/OptinList';
import AddTraineeModal from './Modal';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  NavbarBrand,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function Tables() {
  const [trainees, setTrainees] = useState([]);
  const [optins, setOptins] = useState([]);
  const [show, setShow] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState('');
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const traineesData = await fetch(
        'https://tenxdapp.herokuapp.com/api/v1/trainees'
      );
      const traineesOptinData = await fetch(
        'https://tenxdapp.herokuapp.com/api/v1/trainees/optin'
      );
      const data = await traineesData.json();
      const data1 = await traineesOptinData.json();
      setTrainees(data.data.trainees);
      setOptins(data1.data.optins);
    }
    fetchData();
  }, []);

  useEffect(() => {
    getAccounts();
  }, []);
  const AccountList = () => {
    return accounts.map((account) => {
      return (
        <DropdownItem
          key={account.address}
          onClick={(e) => {
            setAccount(e.target.innerHTML);
          }}
        >
          {account.address}
        </DropdownItem>
      );
    });
  };
  const getAccounts = async () => {
    await AlgoSigner.connect();
    await AlgoSigner.accounts({
      ledger: 'TestNet',
    })
      .then((d) => {
        setAccounts(d);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const toggle = () => {
    setDropDown(!dropDown);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  <NavbarBrand
                    data-placement="bottom"
                    to="/"
                    // target="_blank"
                    title="TENXDAPP"
                    tag={Link}
                  >
                    Tenx Admin Dashboard
                  </NavbarBrand>
                </CardTitle>
                <Button
                  variant="primary"
                  onClick={handleShow}
                  style={{ marginLeft: '70rem' }}
                >
                  Add Trainee
                </Button>
                <AddTraineeModal show={show} onHide={() => setShow(false)} />
                <Dropdown isOpen={dropDown} toggle={toggle}>
                  <DropdownToggle variant="success" id="dropdown-basic">
                    {account === '' ? 'Select Algo Account' : account}
                  </DropdownToggle>
                  <DropdownMenu>
                    <AccountList />
                  </DropdownMenu>
                </Dropdown>
              </CardHeader>

              <CardBody>
                <CardTitle tag="h4"> Trainee List </CardTitle>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Trainee Name</th>
                      <th>Email</th>
                      <th>Country</th>
                      <th className="text-right">Status</th>
                      <th className="text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <TraineeList trainees={trainees} account={account} />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Optins</CardTitle>
                <p className="category">
                  List of trainees that opted in for a certificate. You can
                  choose to accept or decline each request!
                </p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      {/* <th>Status</th> */}
                      <th>Public Address</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <OptinList traineesOptin={optins} adminAddress={account} />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
