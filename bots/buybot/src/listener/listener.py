from src.web3.w3 import web3, factories, pairs
from src.listener.events import EventFilter, ReturnMessage
import asyncio


class Listener:
    def __init__(self):
        self.disabled = False
        # keys: "{swap}-{tokenA}-{tokenB}"
        self.events = {}

    def register_event(self, tokenA, tokenB, callback, swap = "uniswap", **kwargs):

        tokenA, tokenB = web3.toChecksumAddress(tokenA), web3.toChecksumAddress(tokenB)

        # default to uniswap v2
        if swap == "uniswap":
            swap = "uniswap-v2"
        
        factory = factories[swap]

        # do not recreate the event if it already exists
        key = f"{swap}-{tokenA}-{tokenB}"
        if key in self.events:
            self.events[key].callbacks.append(callback)
            return ReturnMessage(True, "Successfully registered event")
            

        # create the event and register it to the running loop
        try:
            if swap == "uniswap-v2":
                pair_addr = factory.functions.getPair(tokenA, tokenB).call()
                pair = web3.eth.contract(address=pair_addr, abi=pairs[swap])
                filter = pair.events.Swap().createFilter(fromBlock=0)
                
                self.events[key] = EventFilter([callback], filter, tokenA, tokenB, swap, pair_addr)
            if swap == "uniswap-v3":
                
                fee = kwargs.get("fee", 1)
                if not isinstance(fee, int):
                    return ReturnMessage(False, "The fee must be an integer")

                pair_addr = factory.functions.getPool(tokenA, tokenB, kwargs["fee"] ).call()

                if pair_addr == "0x0000000000000000000000000000000000000000":
                    return ReturnMessage(False, "The pair - fee combination does not exist")
                
                pair = web3.eth.contract(address=pair_addr, abi=pairs[swap])
                filter = pair.events.Swap().createFilter(fromBlock=0)

                self.events[key] = EventFilter([callback], filter, tokenA, tokenB, swap, pair_addr)
            
            self.start_listener(self.events[key])
            return ReturnMessage(True, "Successfully registered event")
        except Exception as e:
            return ReturnMessage(False, "Internal error: " + str(e))    

    async def callback_loop(self, event, poll_interval):
        filter = event.filter
        print("listening for events (dex: {}, tokenA: {}, tokenB: {}, pair_addr: {})".format(event.swap, event.tokenA, event.tokenB, event.pair_addr))
        while True:
            for entry in filter.get_new_entries():
                for callback in event.callbacks:
                    callback(entry)
            await asyncio.sleep(poll_interval)

    def start_listener(self, event):
        loop = asyncio.get_event_loop()
        try:
            loop.run_until_complete(asyncio.gather(self.callback_loop(event, 2)))
        finally:
            loop.close()

    def disable_event(self):
        pass