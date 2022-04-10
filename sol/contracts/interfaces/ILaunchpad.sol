// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ILaunchpad {
  // address public signer;
  function isOwnerOrSigner(address _signer) external view returns (bool);

  function saleToSigner(uint256) external view returns (address);

  function feesWallet() external view returns (address);

  function currentSaleId() external view returns (uint256);

  function fees() external view returns (uint256);
}
