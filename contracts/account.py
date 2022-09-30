import json
import base64
from algosdk.future.transaction import PaymentTxn, wait_for_confirmation
import time
from algosdk import account, mnemonic
from algosdk.v2client import algod

def create_account(fund=True):
    # This function creates an aldorand account on the testnet using the purestake api

    algod_token = "kMlcfoNTkg9VvVzN1m2ZX9aa3sjupUkta8KlwlnF"
    algod_address = "https://testnet-algorand.api.purestake.io/ps2"
    algod_client = algod.AlgodClient(algod_token, algod_address)

    # craeting an account for a transcation
    private_key, my_address = account.generate_account()

    m = mnemonic.from_private_key(private_key)

    return m

def closeout_account(algod_client, account):
    # build transaction
    print("Closing out account......")
    params = algod_client.suggested_params()
    
    receiver = "HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA"
    note = "closing out account".encode()

    unsigned_txn = PaymentTxn(account["pk"], params, receiver, 0, receiver, note)

    # sign transaction
    signed_txn = unsigned_txn.sign(account["sk"])
    txid = algod_client.send_transaction(signed_txn)
    print("Transaction Info:")
    print("Signed transaction with txID: {}".format(txid))

    # wait for confirmation
    try:
        confirmed_txn = wait_for_confirmation(algod_client, txid, 4)
        print("TXID: ", txid)
        print("Result confirmed in round: {}".format(confirmed_txn["confirmed-round"]))
    except Exception as err:
        print(err)
        return
    account_info = algod_client.account_info(account["pk"])
    print("Account balance: {} microAlgos".format(account_info.get("amount")) + "\n")
    print("Account Closed")