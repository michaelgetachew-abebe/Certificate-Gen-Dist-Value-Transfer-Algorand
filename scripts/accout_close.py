from algosdk.future.transaction import PaymentTxn, wait_for_confirmation


def closeout_account(algod_client, account):
    print("--------------------------------------------")
    print("Closing out account......")
    params = algod_client.suggested_params()

    receiver = "" #Receiver Key
    note = "closing out account".encode()

    # Fifth argument is a close_remainder_to parameter that creates a payment txn that sends all of the remaining funds to the specified address. If you want to learn more, go to: https://developer.algorand.org/docs/reference/transactions/#payment-transaction
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