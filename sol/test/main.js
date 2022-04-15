const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("Launchpad tests", async () => {
  let master, owner, acc1, acc2, acc3, launchpad, presale, token;
  const fee = ethers.utils.parseEther("0.1");

  before(async () => {
    [master, owner, acc1, acc2, acc3] = await ethers.getSigners();
  });

  it("deploy the launchpad", async () => {
    console.log("Starting deployement of the Launchpad Contract");

    const Launchpad = await hre.ethers.getContractFactory("Launchpad");
    launchpad = await Launchpad.deploy(50, fee, master.address);

    await launchpad.deployed();

    console.log("Launchpad deployed to:", launchpad.address);
  });

  it("deploy the presale", async () => {
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
        whitelisted: [acc1.address, acc2.address, acc3.address],
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
  });

  it("testing raffle round", async () => {
    let [round, round_index] = await presale.getRound();
    expect(round_index.toNumber()).to.equal(1);
  });

  it("testing add raffle", async () => {
    await presale.connect(master).addRaffleWinner(acc3.address);
    expect(await presale.isWhitelisted(acc3.address)).to.equal(true);
  });

  it("testing buy raffle", async () => {
    await expect(presale.connect(acc3).buy({ value: ethers.utils.parseUnits("0.01", "ether") })).to.be.ok;
  });

  it("testing whitelist round", async () => {
    await network.provider.send("evm_increaseTime", [105]);
    await ethers.provider.send("evm_mine");
    let [round, round_index] = await presale.getRound();
    expect(round_index.toNumber()).to.equal(2);
  });

  it("testing mint with wrong user", async () => {
    await expect(presale.buy({ value: ethers.utils.parseUnits("0.01", "ether") })).to.be.reverted;
  });

  it("testing mint with right user", async () => {
    expect(await presale.connect(acc1).buy({ value: ethers.utils.parseUnits("1", "ether") })).to.be.ok;
    expect(await presale.connect(acc2).buy({ value: ethers.utils.parseUnits("1", "ether") })).to.be.ok;
  });

  it("testing user mint a second time (exceed maxBuyPerUser)", async () => {
    await expect(presale.connect(acc1).buy({ value: ethers.utils.parseUnits("1", "ether") })).to.be.reverted;
  });

  it("testing user mint a third time (min minBuyPerUser)", async () => {
    await expect(presale.connect(acc2).buy({ value: ethers.utils.parseUnits("0.001", "ether") })).to.be.reverted;
  });

  it("testing whitelist round 2", async () => {
    await network.provider.send("evm_increaseTime", [105]);
    await ethers.provider.send("evm_mine");
    let [round, round_index] = await presale.getRound();
    expect(round_index.toNumber()).to.equal(3);
  });

  it("testing no sale is currently running", async () => {
    await network.provider.send("evm_increaseTime", [105]);
    await ethers.provider.send("evm_mine");
    let [round, round_index] = await presale.getRound();
    expect(round_index.toNumber()).to.equal(1000);
  });

  it("testing public sale", async () => {
    await network.provider.send("evm_increaseTime", [105]);
    await ethers.provider.send("evm_mine");
    let [round, round_index] = await presale.getRound();
    expect(round_index.toNumber()).to.equal(0);
  });

  it("testing removing a round", async () => {
    // save the state before making changes
    const snap_id = await network.provider.send("evm_snapshot");

    // rollback
    await network.provider.send("evm_increaseTime", [-305]);
    await ethers.provider.send("evm_mine");

    // check the round
    let [round, round_index] = await presale.getRound();
    expect(round_index.toNumber()).to.equal(2);

    // remove the round
    const _round = await presale.rounds(0);
    await presale.removeRound(0);
    [round, round_index] = await presale.getRound();
    expect(round_index.toNumber()).to.equal(1);

    // restore the state
    await network.provider.send("evm_revert", [snap_id]);
  });

  it("testing adding a round", async () => {
    // goto round 2
    await network.provider.send("evm_increaseTime", [-60000]);
    await ethers.provider.send("evm_mine");

    // check the round doesn't exist
    let round = await presale.rounds(4);
    expect(round.startTime).to.be.equal(0);

    // add a round
    await presale.addRound({
      startTime: Math.floor(Date.now() / 1000) - 70000,
      endTime: Math.floor(Date.now() / 1000) - 50000,
      whitelisted: ["0x10ED43C718714eb63d5aA57B78B54704E256024E"],
    });

    [round, round_index] = await presale.getRound();
    expect(round_index.toNumber()).to.equal(4);
  });

  it("abort the sale", async () => {
    // save the state before making changes
    const snap_id = await network.provider.send("evm_snapshot");
    await ethers.provider.send("evm_mine");

    // should not be able to claim before sale is aborted
    await expect(presale.connect(acc1).claim()).to.be.reverted;

    await presale.abort();
    expect((await presale.description()).saleAborted).to.equal(true);

    // check buy
    await expect(presale.connect(acc1).buy({ value: ethers.utils.parseUnits("0.01", "ether") })).to.be.reverted;

    // claim
    const balance = await token.balanceOf(acc1.address);
    await expect(presale.connect(acc1).claim()).to.be.ok;
    expect(await token.balanceOf(acc1.address)).to.be.above(balance);

    // owner should not be able to claim
    await expect(presale.connect(owner).signer_claim()).to.be.reverted;

    // restore the state
    await network.provider.send("evm_revert", [snap_id]);
    await ethers.provider.send("evm_mine");

    expect((await presale.description()).saleAborted).to.equal(false);
  });

  it("finish the sale", async () => {
    // save the state before making changes
    const snap_id = await network.provider.send("evm_snapshot");
    await ethers.provider.send("evm_mine");

    // should be finished after 100000 ts
    await ethers.provider.send("evm_increaseTime", [100000]);
    await ethers.provider.send("evm_mine");

    // check buy
    await expect(presale.connect(acc1).buy({ value: ethers.utils.parseUnits("0.01", "ether") })).to.be.reverted;
    await expect(presale.connect(acc2).buy({ value: ethers.utils.parseUnits("0.01", "ether") })).to.be.reverted;
    await expect(presale.connect(acc3).buy({ value: ethers.utils.parseUnits("0.01", "ether") })).to.be.reverted;

    // check claim
    let balance = await token.balanceOf(acc1.address);
    await expect(presale.connect(acc1).claim()).to.be.ok;
    expect(await token.balanceOf(acc1.address)).to.be.above(balance);

    // some liquidity should already have been paid
    balance = await ethers.provider.getBalance(owner.address);
    await presale.connect(owner).signer_claim();
    expect(await ethers.provider.getBalance(owner.address)).to.be.above(balance);
    await expect(presale.vesting_wallet()).to.not.be.undefined;

    // presale contract's balance should be 0
    expect(await ethers.provider.getBalance(presale.address)).to.be.equal(0);
  });
});
