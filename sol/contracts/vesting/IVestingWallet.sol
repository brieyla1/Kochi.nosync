// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IVestingWallet {
  function setToken(address tokenAddress) external;

  function setVestingSchedule(
    uint256 id,
    uint256 start,
    uint256 duration,
    uint256 interval
  ) external returns (bool);

  function deposit(
    uint256 schedule,
    address beneficiary,
    uint256 amount
  ) external;

  function deposit(
    uint256 schedule,
    address[] calldata beneficiaries,
    uint256[] calldata amounts
  ) external;
}
