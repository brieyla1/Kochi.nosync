const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Launchpad tests", async () => {
  let master;
  let owner;
  let launchpad;
  const fee = ethers.utils.parseEther("0.1");

  it("deploy the launchpad", async () => {
    [owner] = await ethers.getSigners();

    console.log("Starting deployement of the Launchpad Contract");

    const Launchpad = await hre.ethers.getContractFactory("Launchpad");
    launchpad = await Launchpad.deploy(500, fee, owner.address);

    await launchpad.deployed();

    console.log("Launchpad deployed to:", launchpad.address);
  });

  it("deploy the presale", async () => {
    const [owner] = await ethers.getSigners();

    console.log("Starting deployement of the Launchpad Presale");

    const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
    const totalSupply = ethers.BigNumber.from("200000");
    const softcap = ethers.BigNumber.from("120000");
    const maxBuyPerUser = ethers.BigNumber.from("1000");
    const minBuyPerUser = ethers.BigNumber.from("10");
    const liquidityShare = ethers.BigNumber.from("200000") - ethers.BigNumber.from("120000");
    const tokenAmount = ethers.BigNumber.from("120000");
    const token = await MockERC20.deploy("mock", "MK", totalSupply);

    _input = {
      tokenTotalAmount: totalSupply,
      listingTokensPerOneBaseCurrency: 100,
      hardcap: totalSupply,
      softcap: softcap,
      transactionFees: 1e3,
      tokensPerOneBaseCurrency: 100,
      liquidityShare: 1,
      liquidityUnlockTimestamp: Math.floor(Date.now() / 1000) + 100000,
      maxBuyPerUser: maxBuyPerUser,
      minBuyPerUser: minBuyPerUser,
      tokenAmountForSale: tokenAmount,
      tokenAmountForLiquidity: liquidityShare,
    };

    description = {
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
        startTime: Math.floor(Date.now() / 1000) + 100000,
        endTime: Math.floor(Date.now() / 1000) + 200000,
        whitelisted: [],
      },
      {
        startTime: Math.floor(Date.now() / 1000) + 100000,
        endTime: Math.floor(Date.now() / 1000) + 200000,
        whitelisted: [],
      },
    ];

    const presale = await launchpad.createPresale(
      token.address,
      description.name,
      description.description,
      description.image_url,
      description.router,
      _input,
      rounds,
      {
        value: fee,
      }
    );
  });
});
