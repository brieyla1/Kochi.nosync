const Web3 = require("web3");
const config = require("./config.json");
const { provider } = require("web3-core");

const masterAbi = require("./abi/master.json");
const childAbi = require("./abi/child.json");

const dev = true;

const infuraKey = "b5783a05328742228e40313ffb3c52f5";
const ProviderUrl = dev ? "http://127.0.0.1:7545/" : `https://rinkeby.infura.io/v3/${infuraKey}`;

if (dev) config.masterAddress = "0x4E3ac0e6d16205182B402E04a7ED310c2817F0e2";

console.log(ProviderUrl, config);

const web3 = new Web3(ProviderUrl);

const master = new web3.eth.Contract(masterAbi, config.masterAddress);

master.methods
  .getSales()
  .call()
  .then((el) => console.log(el));

module.exports = { web3, master, childAbi };
