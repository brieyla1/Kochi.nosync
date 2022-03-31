from web3 import Web3
import json

web3 = Web3(Web3.IPCProvider("/home/gas/.geth-eth-snap1/geth.ipc"))




with open("abis/uniswap-v2/factory.json") as f:
    uniswap2_factory_abi = json.load(f)
with open("abis/uniswap-v2/pair.json") as f:
    uniswap2_pair_abi = json.load(f)

with open("abis/uniswap-v3/factory.json") as f:
    uniswap3_factory_abi = json.load(f)
with open("abis/uniswap-v3/pool.json") as f:
    uniswap3_pool_abi = json.load(f)


# uniswap-v2
uniswap2_factory_addr = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
uniswapv2 = web3.eth.contract(address=uniswap2_factory_addr, abi=uniswap2_factory_abi)

# uniswap-v3
uniswap3_factory_addr = '0x1F98431c8aD98523631AE4a59f267346ea31F984'
uniswapv3 = web3.eth.contract(address=uniswap3_factory_addr, abi=uniswap3_factory_abi)


# create an enum of all the swap DEX
factories = {
    'uniswap-v2': uniswapv2,
    'uniswap-v3': uniswapv3
}

pairs = {
    'uniswap-v2': uniswap2_pair_abi,
    'uniswap-v3': uniswap3_pool_abi
}


