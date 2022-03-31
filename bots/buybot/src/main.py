from src.listener.listener import Listener
from interfaces.uniswapv2 import query

def callback(entry):
    print(entry)
    entry = dict(entry)
    pair_information = query(entry["address"])

    print({
        entry,
        pair_information
    })

# WETH token address
tokenA = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
# USDT token address
tokenB = "0xdac17f958d2ee523a2206206994597c13d831ec7"

listener = Listener()
print(listener.register_event(tokenA, tokenB, callback, "uniswap-v2", fee=10000))