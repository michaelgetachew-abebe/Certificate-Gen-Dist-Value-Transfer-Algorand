/* global AlgoSigner */

import { useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import algosdk from 'algosdk';

function TraineeList({ trainees, account }) {
  const [loading, setLoading] = useState(false);
  // const [signedTxnId, setSignedTxnId] = useState('');
  // const [signedBlob, setSignedTxnBlob] = useState('');

  const connectAlgo = async () => {
    try {
      const r = await AlgoSigner.connect();
      // alert(JSON.stringify(r, null, 2));
      return JSON.stringify(r, null, 2);
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  };
  const checkAglo = async () => {
    if (typeof AlgoSigner !== 'undefined') {
      // alert('AlgoSigner is installed.');
      await connectAlgo();
      return true;
    } else {
      // alert('AlgoSigner is NOT installed.');
      return false;
    }
  };
  const mintTx = async (txId, name, email) => {
    let txConf = await fetch('https://tenxdapp.herokuapp.com/api/v2/nft/send', {
      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: JSON.stringify({
        address: account,
        txId,
        name,
        email,
      }),

      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    txConf = await txConf.json();
    console.log(txConf);
  };
  const handleMint = async ({ name, email, country, status }) => {
    // console.log(data);
    const exists = await checkAglo();
    if (!exists) {
      alert('You must first install AlgoSigner to Mint Certificates');
      return;
    }
    if (account === '') {
      alert('Please select an account before minting an asset!');
      return;
    }

    setLoading(true);
    console.log(name, email, country, status);
    // https://tenxdapp.herokuapp.com/api/v1/nft

    // process.exit();
    const data = await fetch('https://tenxdapp.herokuapp.com/api/v2/nft', {
      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: JSON.stringify({
        name,
        email,
        address: account,
      }),

      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const res = await data.json();

    if (res.status === 'fail') {
      console.log(res);
      alert(res.message);
      return;
    } else {
      console.log(res);
      const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        ...res.tnxObj,
      });
      const txn_b64 = await AlgoSigner.encoding.msgpackToBase64(txn.toByte());
      const signedTxs = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
      console.log(signedTxs);
      // process.exit(1);
      // alert(JSON.stringify(signedTxs, null, 2));
      alert('successfully signed transaction!');
      const tx = await AlgoSigner.send({
        ledger: 'TestNet',
        tx: signedTxs[0].blob,
      });

      await mintTx(tx.txId, name, email);
    }

    // signed Txn format
    // [
    //   {
    //     "txID": "KAKIX6L5HO3WIITSGVRC2RDCJQDNL3UD23MPSC5BMH3ASU65LD7A",
    //     "blob": "gqNzaWfEQCeurY9HfAXlen6RLWr6EHmogwqI5PHeDVxTXeS+dWz89XXxCuMZuZwa3p009swWUHHIG2GGUI3ZJp3XDoYIHA+jdHhuiKRhcGFyg6JhbqRhc3NhoXQBonVuo25hcqNmZWXNA+iiZnbOAVdF0aNnZW6sdGVzdG5ldC12MS4womdoxCBIY7UYpLPITsgQ8i1PEIHLD3HwWaesIN7GL39w5Qk6IqJsds4BV0m5o3NuZMQg+ci22zqx4fe45L7tnhKKQg2GxO3oLqVjQnGwe9L2C8ukdHlwZaRhY2Zn"
    //   }
    // ]

    setLoading(false);
    alert('Asset minted successfully!');

    window.location.reload(true);
  };

  return trainees.map((trainee) => {
    return (
      <tr key={trainee._id}>
        <td>{trainee.name}</td>
        <td>{trainee.email}</td>
        <td>{trainee.country}</td>
        <td>{trainee.status}</td>
        {trainee.status === 'pass' ? (
          <td className="text-center">
            <Button
              variant="primary"
              className="btn-primary"
              onClick={() => handleMint(trainee)}
            >
              {loading ? (
                <Spinner type="border" color="sucess" />
              ) : (
                trainee.mint
              )}
            </Button>
          </td>
        ) : (
          <td className="text-center">Mint</td>
        )}
      </tr>
    );
  });
}

export default TraineeList;
