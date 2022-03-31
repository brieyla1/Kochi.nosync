class EventFilter:
    def __init__(self, callbacks, filter, tokenA, tokenB, swap, pair_addr):
        self.callbacks = callbacks
        self.filter = filter
        self.tokenA = tokenA
        self.tokenB = tokenB
        self.swap = swap
        self.pair_addr = pair_addr
        
class ReturnMessage:
    def __init__(self, success, message):
        self.success = success
        self.message = message

    def __bool__(self):
        return self.success

    def __str__(self):
        return self.message