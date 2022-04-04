// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ILaunchpadMaster {

    function saleToSigner(uint256) external view returns(address);
    function feesWallet() external view returns(address);

    function addressToSaleId(address) external view returns(uint256);
    function saleIdToAddress(uint256) external view returns(address);
    function currentSaleId() external view returns(uint256);
    
    function fees() external view returns(uint256);
}   