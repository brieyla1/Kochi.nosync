require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const fs = require('fs');
fs.readFileSync('../config.env')
  .toString()
  .split('\n')
  .forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      console.log(line);
      process.env[key] = value;
    }
  });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.7',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  // rinkeby
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/wESK28uC2bhbARFkT_vl5GSzbklbOeKd`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
