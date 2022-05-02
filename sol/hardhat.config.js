require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

let env = {};
const fs = require("fs");
fs.readFileSync("../config.env")
  .toString()
  .split("\n")
  .forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) env[key] = value.includes(",") ? value.split(",") : value;
  });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
  // rinkeby
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/wESK28uC2bhbARFkT_vl5GSzbklbOeKd`,
      accounts: env.HARDHAT_PRIVATE_KEYS,
    },

    ganache: {
      url: "http://0.0.0.0:7545",
    },
  },
};
