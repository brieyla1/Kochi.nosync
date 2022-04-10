// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "contracts/interfaces/ILaunchpad.sol";
import "contracts/interfaces/ILaunchpadUtil.sol";

contract Presale is ReentrancyGuard, Pausable {
  ILaunchpadUtil.SInput public input;
  ILaunchpadUtil.SDescription public description;
  ILaunchpadUtil.STokenomics public tokenomics;
  mapping(uint256 => ILaunchpadUtil.SRound) public rounds;

  ILaunchpad public master;

  mapping(address => uint256) public userBuyAmount;

  constructor(
    ILaunchpadUtil.SInput memory _input,
    ILaunchpadUtil.SDescription memory _description,
    ILaunchpadUtil.SRound[] memory _rounds
  ) {
    master = ILaunchpad(msg.sender);

    input = _input;
    description = _description;

    for (uint256 i = 0; i < _rounds.length; i++) {
      rounds[i] = _rounds[i];
    }

    require(input.softcap > 0 && input.hardcap > 0, "Softcap and Hardcap must be greater than 0");
    require(
      input.hardcap >= input.softcap && input.softcap > (input.hardcap / 2),
      "Hardcap must be greater than Softcap, and Softcap must be greater than 50% of Hardcap"
    );
    require(input.minBuyPerUser < input.hardcap && input.maxBuyPerUser < input.hardcap, "The user cannot buy more than the hardcap");
    require(input.minBuyPerUser > 0 && input.maxBuyPerUser > 0, "The user cannot buy less than 0");
    require(input.minBuyPerUser <= input.maxBuyPerUser, "The user cannot buy more than the maxBuyPerUser");
    require(
      input.tokenAmountForLiquidity / input.listingTokensPerOneBaseCurrency < ((input.hardcap * (10000 - input.transactionFees)) / 10000),
      "the listing tokens liquidity must be less than the hardcap * (10000 - (transactionFees)) / 10000, this is to ensure that there is enough liquidity."
    );
  }

  function buy() public payable {
    require(msg.value >= input.minBuyPerUser, "The user cannot buy less than the minBuyPerUser");
    require(msg.value <= input.maxBuyPerUser, "The user cannot buy more than the maxBuyPerUser");
    require(msg.value <= input.hardcap, "The user cannot buy more than the hardcap");
    require(msg.value >= input.minBuyPerUser, "The user cannot buy less than the minBuyPerUser");

    isWhitelisted(msg.sender, currentRound());

    userBuyAmount[msg.sender] = userBuyAmount[msg.sender] + msg.value;
  }

  modifier signerOrOwner() {
    require(msg.sender == description.signer || msg.sender == description.owner, "Only the signer or owner can call this function");
    _;
  }

  function getUserBuyAmount() public view returns (uint256) {
    return userBuyAmount[msg.sender];
  }

  function whitelist(address[] memory addrs, uint256 round) public signerOrOwner {
    lgth = rounds[round].whitelist.length;
    for (uint256 i = 0; i < addrs.length; i++) {
      rounds[round].whitelist[lgth + i] = addrs[i];
    }
  }

  function currentRound() public view returns (uint256) {
    uint256 currentTime = now;
    uint256 currentRound = 0;

    for (uint256 i = 0; i < rounds.length; i++) {
      if (rounds[i].startTime <= currentTime && rounds[i].endTime >= currentTime) {
        currentRound = i;
      }
    }

    return currentRound;
  }

  function isWhitelisted(address addr, uint256 round) public view returns (bool) {
    return rounds[round]["whitelisted"].contains(addr);
  }
}
