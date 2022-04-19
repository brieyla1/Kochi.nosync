// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.11;

import "./CVestingWallet.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract VestingFactory {
  address private immutable baseImplementation;
  event VestingWalletCreated(address indexed beneficiaryAddress, uint64 startTimestamp, uint64 durationSeconds, address indexed vestingWalletAddress);

  constructor() {
    baseImplementation = address(new VestingWallet());
  }

  /// The newly created wallet should have zero balance
  function createVestingSchedule(
    address _beneficiaryAddress,
    uint64 _startTimestamp,
    uint64 _durationSeconds
  ) external returns (address) {
    address clone = Clones.clone(baseImplementation);
    VestingWallet(payable(clone)).initialize(_beneficiaryAddress, _startTimestamp, _durationSeconds);
    emit VestingWalletCreated(_beneficiaryAddress, _startTimestamp, _durationSeconds, clone);
    return clone;
  }
}
