const { web3, master } = require('../web3.js');

async function getListingList() {
  try {
    return await master.methods.getSales().call();
  } catch (err) {
    return err;
  }
}

module.exports = { getListingList };
