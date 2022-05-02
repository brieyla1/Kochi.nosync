// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers, network } = require("hardhat");

async function main() {
  let master, owner, acc1, acc2, acc3, launchpad, presale, token, vesting_wallet;
  const fee = ethers.utils.parseEther("0.1");

  [master, owner, acc1, acc2, acc3] = await ethers.getSigners();

  console.log("Starting deployement of the VestingFactory");

  const vestingFactory = await ethers.getContractFactory("VestingFactory");
  vesting_wallet = await vestingFactory.deploy();
  await vesting_wallet.deployed();
  vesting_wallet = vesting_wallet.address;

  console.log("Starting deployement of the Launchpad Contract");

  const Launchpad = await hre.ethers.getContractFactory("Launchpad");
  console.log(vesting_wallet);
  launchpad = await Launchpad.deploy(50, fee, master.address, vesting_wallet);

  await launchpad.deployed();

  console.log("Launchpad deployed to:", launchpad.address);

  console.log("Starting deployement of the Launchpad Presale");

  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  const totalSupply = ethers.BigNumber.from("1000000000");
  const liquidityShare = ethers.BigNumber.from(totalSupply).div(4);
  const tokenAmount = ethers.BigNumber.from(totalSupply - liquidityShare);

  // max: 1 ethereum
  // min: 0.01 ethereum
  const maxBuyPerUser = ethers.utils.parseUnits("1", "ether");
  const minBuyPerUser = ethers.utils.parseUnits("0.01", "ether");

  token = await MockERC20.connect(owner).deploy("mock", "MK", totalSupply);
  await token.deployed();

  console.log("deployed dummy ERC20 token to:", token.address);

  const input = {
    tokenTotalAmount: totalSupply,
    listingTokensPerOneBaseCurrency: 100,
    hardcap: ethers.utils.parseUnits("3", "ether"),
    softcap: ethers.utils.parseUnits("2", "ether"),
    tokensPerOneBaseCurrency: 100,
    liquidityUnlockPercentage: 75,
    liquidityUnlockTimestamp: Math.floor(Date.now() / 1000) + 100000,
    liquidityUnlockEndTimestamp: Math.floor(Date.now() / 1000) + 1000000,
    maxBuyPerUser: maxBuyPerUser,
    minBuyPerUser: minBuyPerUser,
    tokenAmountForSale: tokenAmount,
    tokenAmountForLiquidity: liquidityShare,
    publicSaleTimestamp: Math.floor(Date.now() / 1000) + 400,
    publicSaleEndTimestamp: Math.floor(Date.now() / 1000) + 500,
  };

  const description = {
    name: "test",
    description: "test description",
    image_url: "test.png",
    router: {
      name: 0,
      addr: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    },
  };

  const rounds = [
    {
      startTime: Math.floor(Date.now() / 1000) + 100,
      endTime: Math.floor(Date.now() / 1000) + 200,
      whitelisted: [acc1.address],
    },
    {
      startTime: Math.floor(Date.now() / 1000) + 200,
      endTime: Math.floor(Date.now() / 1000) + 300,
      whitelisted: [],
    },
  ];

  console.log("Starting presale deployment");

  console.log("allocating allowance");
  await token.connect(owner).approve(launchpad.address, totalSupply);

  console.log("deploying presale");
  const tx = await launchpad
    .connect(owner)
    .createPresale(token.address, description.name, description.description, description.image_url, description.router, input, rounds, {
      value: ethers.utils.parseEther("0.1"),
    });

  receipt = await tx.wait();

  presale_address = receipt.events.filter((e) => e.event === "SaleCreated")[0].args.sale_address;
  presale = await hre.ethers.getContractAt("Presale", presale_address);
  console.log("presale at: ", presale_address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
