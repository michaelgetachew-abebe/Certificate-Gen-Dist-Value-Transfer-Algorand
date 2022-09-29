/* global AlgoSigner */

import { useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import algosdk from 'algosdk';

function OptinList({ traineesOptin, adminAddress }) {
  // alert(adminAddress);
  const [loading, setLoading] = useState(false);

  const transferTx = async (txId, name, email, assetID) => {
    let txConf = await fetch(
      'https://tenxdapp.herokuapp.com/api/v2/nft/transferVerify',
      {
        // Adding method type
        method: 'POST',

        // Adding body or contents to send
        body: JSON.stringify({
          txId,
          name,
          email,
          asset_id: assetID,
        }),

        // Adding headers to the request
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );

    txConf = await txConf.json();
    console.log(txConf);
  };

  const handleAccept = async ({ name, address, asset_id, email }) => {
    if (adminAddress === '') {
      alert('Please select an account before transferring an asset!');
      return;
    }
    setLoading(true);
    // fetch('https://tenxdapp.herokuapp.com/api/v1/nft/transfer', {
    let res = await fetch(
      'https://tenxdapp.herokuapp.com/api/v2/nft/transfer',
      {
        method: 'POST',
        body: JSON.stringify({
          address: adminAddress,
          address2: address,
          asset_id,
          email,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    res = await res.json();
    console.log(res);
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      ...res.txnObj,
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
    await transferTx(tx.txId, name, email, asset_id);
    alert('Asset Transferred to trainee!');
    alert('Asset Frozen!');
    window.location.reload(true);
  };

  const handleDecline = ({ name, address }) => {
    console.log(name, address);
    // https://tenxdapp.herokuapp.com/api/v1/nft
    fetch('https://tenxdapp.herokuapp.com/api/v1/trainees/optin', {
      // Adding method type
      method: 'DELETE',

      // Adding body or contents to send
      body: JSON.stringify({
        name,
        address,
      }),

      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      // Converting to JSON
      .then((response) => response.json())
      .then(console.log);
    // window.location.reload(false);
  };
  return traineesOptin.map((trainee) => {
    return (
      <tr key={trainee._id}>
        <td>{trainee.name}</td>
        <td>{trainee.address}</td>
        {/* <td>{trainee.status}</td> */}
        <td className="text-center">
          <Button
            variant="success"
            className="btn-success"
            onClick={() => handleAccept(trainee)}
          >
            {loading ? <Spinner type="border" color="sucess" /> : 'Accept'}
          </Button>{' '}
          <Button
            variant="danger"
            className="btn-danger"
            onClick={() => handleDecline(trainee)}
          >
            Decline
          </Button>
        </td>
      </tr>
    );
  });
}

export default OptinList;
