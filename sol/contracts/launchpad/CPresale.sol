// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "contracts/vesting/IVestingFactory.sol";
import "contracts/interfaces/ILaunchpadUtil.sol";

import "hardhat/console.sol";

contract Presale is Pausable {
  // information about the presale
  ILaunchpadUtil.SInput public input;
  ILaunchpadUtil.SDescription public description;

  // rounds configuration
  uint256 public raffle_duration = 600; // 10 minutes
  mapping(address => bool) public raffle_whitelist;
  mapping(uint256 => ILaunchpadUtil.SRound) public rounds;
  uint256 public round_count = 0;

  // launchpad contract
  address public master;

  // tracker of the presale transactions
  mapping(address => uint256) public userBuyAmount;
  uint256 public totalBuyAmount = 0;
  address public vesting_wallet;

  constructor(
    ILaunchpadUtil.SInput memory _input,
    ILaunchpadUtil.SDescription memory _description,
    ILaunchpadUtil.SRound[] memory _rounds
  ) {
    master = address(msg.sender);

    input = _input;
    description = _description;

    for (uint256 i = 0; i < _rounds.length; i++) {
      rounds[i] = _rounds[i];
      round_count++;
    }

    require(input.softcap > 0 && input.hardcap > 0, "Softcap and Hardcap must be greater than 0");
    require(
      input.hardcap >= input.softcap && input.softcap > (input.hardcap / 2),
      "Hardcap must be greater than Softcap, and Softcap must be greater than 50% of Hardcap"
    );
    require(input.minBuyPerUser > 0 && input.maxBuyPerUser > 0, "The user cannot buy less than 0");
    require(input.minBuyPerUser <= input.maxBuyPerUser, "The user cannot buy more than the maxBuyPerUser");
    require(
      input.tokenAmountForLiquidity / input.tokensPerOneBaseCurrency < ((input.hardcap * (10000 - description.transactionFees)) / 10000),
      "the listing tokens liquidity must be less than the hardcap * (10000 - (transactionFees)) / 10000, this is to ensure that there is enough liquidity."
    );
    require(input.tokenAmountForSale + input.tokenAmountForLiquidity <= input.hardcap, "The total amount for sale must be less than the hardcap");
    require(
      input.liquidityUnlockTimestamp >= input.publicSaleEndTimestamp &&
        input.liquidityUnlockTimestamp > block.timestamp &&
        input.publicSaleEndTimestamp > block.timestamp,
      "The publicSaleEndTimestamp must be greater than the liquidityUnlockTimestamp, and both should be greater than now"
    );
  }

  function describe() public view returns (ILaunchpadUtil.SLaunchpadExport memory export) {
    export.input = input;
    export.description = description;
    export.vesting_wallet = vesting_wallet;
    export.rounds = get_rounds();

    return export;
  }

  function get_rounds() public view returns (ILaunchpadUtil.SRound[] memory _rounds) {
    _rounds = new ILaunchpadUtil.SRound[](round_count + 2);
    ILaunchpadUtil.SRound memory starting_round = getStatingRound();

    address[] memory empty_array;

    ILaunchpadUtil.SRound memory publicSale = ILaunchpadUtil.SRound({
      startTime: input.publicSaleTimestamp,
      endTime: input.publicSaleEndTimestamp,
      whitelisted: empty_array
    });

    ILaunchpadUtil.SRound memory raffle = ILaunchpadUtil.SRound({
      startTime: starting_round.startTime - raffle_duration,
      endTime: starting_round.startTime,
      whitelisted: empty_array
    });

    _rounds[0] = publicSale;
    _rounds[1] = raffle;

    for (uint256 i = 0; i < round_count; i++) {
      _rounds[i + 2] = rounds[i];
    }

    return _rounds;
  }

  // buy tokens
  function buy() public payable {
    require(msg.value >= input.minBuyPerUser, "The user cannot buy less than the minimum buy per user");
    require(msg.value + userBuyAmount[msg.sender] <= input.maxBuyPerUser, "The user cannot buy more than the maximum buy per user");
    require(msg.value + totalBuyAmount <= input.hardcap, "The user cannot buy more than the hardcap");
    require(description.saleAborted == false, "The sale has been aborted");

    require(isWhitelisted(msg.sender), "The user is not whitelisted");

    userBuyAmount[msg.sender] = userBuyAmount[msg.sender] + msg.value;
    totalBuyAmount = totalBuyAmount + msg.value;
  }

  function claim() public {
    require(userBuyAmount[msg.sender] > 0, "The user has not bought any tokens");
    require(getRoundIndex() == 1001 || description.saleAborted, "The user can only claim after the last round");

    IERC20(description.token).transfer(msg.sender, (userBuyAmount[msg.sender] * input.tokensPerOneBaseCurrency) / (10**18));
    userBuyAmount[msg.sender] = 0;
  }

  function abort() public signerOrOwner {
    require(!description.saleAborted, "The sale has already been aborted");
    description.saleAborted = true;
  }

  function signer_claim() public onlySigner returns (address) {
    require(description.signer == msg.sender, "The user is not the signer");
    require(description.saleAborted == false && getRoundIndex() == 1001, "The sale has not finished properly");
    require(totalBuyAmount >= input.softcap, "The user cannot claim the tokens if the softcap has not been reached");

    vesting_wallet = IVestingFactory(description.VestingFactory).createVestingSchedule(
      msg.sender,
      input.liquidityUnlockTimestamp,
      input.liquidityUnlockEndTimestamp - input.liquidityUnlockTimestamp
    );

    // description.transactionFees / 1000
    uint256 fees = totalBuyAmount * (description.transactionFees / 1000);
    uint256 total = totalBuyAmount - fees;

    payable(vesting_wallet).transfer(total);
    payable(master).transfer(fees);
    totalBuyAmount = 0;

    return vesting_wallet;
  }

  function whitelist(address[] memory addrs, uint256 round) public signerOrOwner {
    uint256 lgth = rounds[round].whitelisted.length;
    for (uint256 i = 0; i < addrs.length; i++) {
      rounds[round].whitelisted[lgth + i] = addrs[i];
    }
  }

  function addRound(ILaunchpadUtil.SRound memory round) public signerOrOwner {
    rounds[round_count] = round;
    round_count++;
  }

  // any other implementation would shift the array, and incur a lot of gas fees
  function removeRound(uint256 round) public signerOrOwner {
    require(round < round_count, "The round does not exist");

    address[] memory tmp;
    rounds[round] = ILaunchpadUtil.SRound(0, 0, tmp);
    round_count--;
  }

  function addRaffleWinner(address addr) public onlyOwner {
    require(!raffle_whitelist[addr], "The user is already whitelisted");
    raffle_whitelist[addr] = true;
  }

  // views & utils
  function isWhitelisted(address addr) public view returns (bool) {
    uint256 round_index = getRoundIndex();

    if (round_index == 0) return true;
    if (round_index == 1) return raffle_whitelist[addr];
    if (round_index == 1000 || round_index == 1001) return false;

    for (uint256 i = 0; i < rounds[round_index - 2].whitelisted.length; i++) if (rounds[round_index - 2].whitelisted[i] == addr) return true;

    return false;
  }

  function getStatingRound() public view returns (ILaunchpadUtil.SRound memory starting_round) {
    uint256 bestTime = input.publicSaleTimestamp;
    address[] memory empty_array;
    starting_round = ILaunchpadUtil.SRound(input.publicSaleTimestamp, input.publicSaleEndTimestamp, empty_array);

    for (uint256 i = 0; i < round_count; i++) {
      if (rounds[i].startTime < bestTime && rounds[i].startTime != 0) {
        bestTime = rounds[i].startTime;
        starting_round = rounds[i];
      }
    }
    return starting_round;
  }

  // 1001 => sale ended
  // 1000 => no round active
  // 0 => public sale
  // 1 => raffle round
  // 2 -> 999 => whitelist rounds
  function getRoundIndex() public view returns (uint256) {
    if (input.publicSaleEndTimestamp < block.timestamp) return 1001;
    uint256 currentTime = block.timestamp;
    uint256 round_index = 1000;
    ILaunchpadUtil.SRound memory starting_round = getStatingRound();

    // public sale
    if (currentTime >= input.publicSaleTimestamp) return 0;
    // raffle sale
    if (starting_round.startTime >= currentTime && starting_round.startTime - raffle_duration <= currentTime) return 1;

    // whitelist
    for (uint256 i = 0; i < round_count; i++) {
      if (rounds[i].startTime <= currentTime && currentTime <= rounds[i].endTime) round_index = i;
    }

    if (round_index == 1000) return round_index;
    return round_index + 2;
  }

  function isSaleEnded() public view returns (bool) {
    if (input.publicSaleEndTimestamp < block.timestamp) return true;
    return false;
  }

  function getRound() public view returns (ILaunchpadUtil.SRound memory round, uint256 round_index) {
    round_index = getRoundIndex();
    address[] memory empty_array;
    ILaunchpadUtil.SRound memory starting_round = getStatingRound();

    if (round_index == 0) round = ILaunchpadUtil.SRound(input.publicSaleTimestamp, input.publicSaleEndTimestamp, empty_array);
    else if (round_index == 1) round = ILaunchpadUtil.SRound(starting_round.startTime - raffle_duration, starting_round.startTime, empty_array);
    else round = rounds[round_index - 2];

    return (round, round_index);
  }

  modifier signerOrOwner() {
    require(msg.sender == description.signer || msg.sender == description.owner, "Only the signer or owner can call this function");
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == description.owner, "Only the owner can call this function");
    _;
  }

  modifier onlySigner() {
    require(msg.sender == description.signer, "Only the owner can call this function");
    _;
  }

  function getUserBuyAmount() public view returns (uint256) {
    return userBuyAmount[msg.sender];
  }
}
