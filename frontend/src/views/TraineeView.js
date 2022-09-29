/* global AlgoSigner */

import { useState, useEffect } from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  NavbarBrand,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import algosdk from 'algosdk';

function Trainee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [assetID, setAssetId] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState('');
  const [dropDown, setDropDown] = useState(false);

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

  const optinTx = async (txId) => {
    let txConf = await fetch('https://tenxdapp.herokuapp.com/api/v2/nft/opt', {
      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: JSON.stringify({
        txId,
        name,
        email,
        address: account,
        asset_id: assetID,
      }),

      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    txConf = await txConf.json();
    console.log(txConf);
  };
  const handleOptin = async () => {
    // console.log(name, email, address, assetID);
    // fetch('https://tenxdapp.herokuapp.com/api/v/trainees/optin', {
    if (account === '') {
      alert('Please select an account before opting in for an asset!');
      return;
    }
    let res = await fetch('https://tenxdapp.herokuapp.com/api/v2/nft/optin', {
      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: JSON.stringify({
        name,
        email,
        address: account,
        asset_id: parseInt(assetID),
      }),

      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    res = await res.json();
    if (res.status === 'fail') {
      alert('something happened...');
      return;
    }
    console.log(res);
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      ...res.tnxObj,
    });
    // Use the AlgoSigner encoding library to make the transactions base64
    const txn_b64 = await AlgoSigner.encoding.msgpackToBase64(txn.toByte());
    const signedTxs = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
    // alert(JSON.stringify(signedTxs, null, 2));
    alert('successfully signed transaction!');
    const tx = await AlgoSigner.send({
      ledger: 'TestNet',
      tx: signedTxs[0].blob,
    });

    await optinTx(tx.txId);
    // .then((res) => res.json())
    // .then((res) => {
    //   if (res.status === 'fail') {
    //     console.log(res);
    //     alert(res.message);
    //   } else {
    //     alert('Request Sent to Admin!');
    //     window.location.reload(true);
    //   }
    // });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">
                  <NavbarBrand
                    data-placement="bottom"
                    to="/"
                    // target="_blank"
                    title="TENXDAPP"
                    tag={Link}
                  >
                    Tenx System
                  </NavbarBrand>
                </h5>
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
                {/* Add a description text */}
                <p>
                  PLEASE OPTIN THE ASSET USING THE{' '}
                  <a href="https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm">
                    algosign
                  </a>{' '}
                  CHROME EXTENSION ONCE YOU GET YOUR ASSET-ID:
                </p>
                <p>
                  Follow the{' '}
                  <a
                    href="https://docs.google.com/document/d/1tRCaUCENfqjJChW74d-9ggr2ocQZrJxig4YdvOPij-Q/edit?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                  >
                    following
                  </a>{' '}
                  step by step guide to opt-in.
                </p>
                <p>
                  Once you optin for the asset, please fill up the form below
                  and we will transfer your certificate
                </p>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Role (disabled)</label>
                        <Input
                          defaultValue="Tenx Trainee"
                          disabled
                          placeholder="Tenx Trainee"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Full Name</label>
                        <Input
                          placeholder="your-full-name"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Email</label>

                        <Input
                          placeholder="email"
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Public Address</label>
                        <Input
                          placeholder="0x390f0f9fk930kf39k3mfe9"
                          type="text"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Asset-ID</label>

                        <Input
                          placeholder="8594322"
                          type="text"
                          onChange={(e) => setAssetId(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={handleOptin}
                >
                  Opt-in
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require('assets/img/emilyz.png').default}
                    />
                    <h5 className="title">Yididiya Samuel</h5>
                  </a>
                  <p className="description">Trainee</p>
                </div>
                <div>Bio</div>
                <div className="card-description">
                  A journey of a thousand miles begins with a single step.
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
      <Card className="card-user">
        <CardHeader>
          <h5 className="title">Trainee's Profile</h5>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col className="pr-md-1" md="5">
                <h5>My certificate </h5>{' '}
                <p>Your certificate is not ready yet!</p>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default Trainee;
