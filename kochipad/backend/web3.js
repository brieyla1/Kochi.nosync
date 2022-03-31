const Web3 = require('web3');
const config = require('./config.json');

const masterAbi = require('./abi/master.json');
const childAbi = require('./abi/child.json');

const infuraKey = 'b5783a05328742228e40313ffb3c52f5';
// const ProviderUrl = `https://rinkeby.infura.io/v3/${infuraKey}`;
const ProviderUrl = 'http://127.0.0.1:8545/';
const web3 = new Web3(ProviderUrl);
const master = new web3.eth.Contract(masterAbi, config.masterAddress);

module.exports = { web3, master, childAbi };
