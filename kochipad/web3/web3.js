const Web3 = require('web3');
const Web3Modal = require('web3modal');

export async function connectWallet() {

  const providerOptions = {
    /* See Provider Options Section */
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);
}

export function enterWhitelabelRaffle() {
  // Check if Metamask is installed
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    // Alert user that Metamask is required
    console.log('MetaMask is not installed');
  }
}
