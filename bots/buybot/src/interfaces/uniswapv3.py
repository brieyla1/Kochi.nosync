import requests
api = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"

def query(id):
    query = """
    {
        pair (id: "%s") {
            token0 {
                symbol
                name
                totalSupply
                tradeVolume
                tradeVolumeUSD
                untrackedVolumeUSD
                totalLiquidity
            }
            token1 {
                symbol
                name
                totalSupply
                tradeVolume
                tradeVolumeUSD
                untrackedVolumeUSD
                totalLiquidity
            }
            reserve0
            reserve1
            totalSupply
            reserveETH
            reserveUSD
            trackedReserveETH
            token0Price
            token1Price
            volumeToken0
            volumeToken1
            volumeUSD
            untrackedVolumeUSD
            txCount
        }
    }
    """ % id

    response = requests.post(api, json={'query': query})
    return response.json()


        