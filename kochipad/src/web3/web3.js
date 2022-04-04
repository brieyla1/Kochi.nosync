import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export async function connectWallet() {

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "INFURA_ID" // required
      }
    },
    binancechainwallet: {
      package: true
    }
  };

  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);
}

export function isWalletConnected() {
  return (typeof window.ethereum !== 'undefined')
}
