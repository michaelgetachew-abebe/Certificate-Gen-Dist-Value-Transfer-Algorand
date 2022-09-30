from pickle import HIGHEST_PROTOCOL
import re
from pyteal import *
from beaker import *

class Auction(Application):
    # Global Bytes
    owner = ApplicationStateValue(stack_type = TealType.bytes)
    highest_bidder = ApplicationStateValue(stack_type = TealType.bytes)

    # Global Ints
    highest_bid = ApplicationStateValue(stack_type=TealType.uint64)
    bid_end = ApplicationStateValue(stack_type=TealType.uint64)

    @create
    def create_auction(self):
        return Seq(
            self.owner.set(Tnx.sender()),
            self.highest_bidder.set(Bytes("")),
            self.highest_bid.set(Int(0)),
            self.bid_end.set(Int(0))
        )
    @external
    def start_auction(self, payment: abi.PaymentTransaction, length: abi.Uint64, start_price: abi.Uint64):
        # Fund the contract with 100000 micro algos
        # set the bid_end to wharever time is specified
        # setup a starting bid amount
        payment = payment.get()
        return Seq(
            Assert(payment.receiver() == Global.current_application_address()),
            Assert(payment.amount() == Int(100000)),
            # set an end
            self.bid_end.set(Global.latest_timestamp() + length.get()),
            self.highest_bid.set(start_price.get())  
        ) 