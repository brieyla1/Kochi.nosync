const { web3, childAbi } = require('../web3.js');

const keys = [
  'tokenTotalAmount',
  'listingTokensPerOneEth',
  'liquidityShareBP',
  'hardcap',
  'softcap',
  'feeBP',
  'startTime',
  'endTime',
  'wlStartTime',
  'saleTokensPerOneEth',
  'liquidityUnlockTimestamp',
  'userVestDuration',
  'teamVestDuration',
  'maxBuyPerUser',
  'minBuyPerUser',
  'tokenAmountForSale',
  'tokenAmountForLiquidity',
  'userVestEnabled',
  'teamVestEnabled',
  'whitelistEnabled',
  'signer',
  'router',
  'token',
  'saleId',
  'name',
  'description',
  'imageUrl',
  'recipient',
  'saleInitiator',
  'totalBuyEth',
  'saleStarted',
  'saleEnded',
  'saleAborted',
];

async function getListing(addr) {
  try {
    const listing = new web3.eth.Contract(childAbi, addr);
    const values = await listing.methods.LaunchpadExport().call();
    // assign values to their keys
    const listingObj = {};
    keys.forEach((key, i) => {
      listingObj[key] = values[i];
    });
    listingObj['addr'] = addr;

    return listingObj;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getListing };
