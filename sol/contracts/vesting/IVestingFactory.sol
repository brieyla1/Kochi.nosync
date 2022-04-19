// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.11;

interface IVestingFactory {
  event VestingWalletCreated(address indexed beneficiaryAddress, uint64 startTimestamp, uint64 durationSeconds, address indexed vestingWalletAddress);

  /// The newly created wallet should have zero balance
  function createVestingSchedule(
    address _beneficiaryAddress,
    uint64 _startTimestamp,
    uint64 _durationSeconds
  ) external returns (address);
}
