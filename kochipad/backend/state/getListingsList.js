const { web3, master } = require("../web3.js");

async function getListingList() {
  try {
    const sales = await master.methods.getSales().call();
    console.log(sales);
    return sales;
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = { getListingList };
