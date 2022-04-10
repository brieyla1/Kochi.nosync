// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IPresale {
  struct SLaunchpadExport {
    // Inputs
    uint256 tokenTotalAmount;
    uint256 listingTokensPerOneEth;
    uint256 liquidityShareBP;
    uint256 hardcap;
    uint256 softcap;
    uint256 feeBP;
    uint256 startTime;
    uint256 endTime;
    uint256 wlStartTime;
    // Utils variables
    uint256 saleTokensPerOneEth;
    uint256 liquidityUnlockTimestamp;
    uint256 maxBuyPerUser;
    uint256 minBuyPerUser;
    uint256 tokenAmountForSale;
    uint256 tokenAmountForLiquidity;
    address signer;
    address router;
    // Medatadata
    address token;
    uint256 saleId;
    string name;
    string description;
    string imageUrl;
    address recipient;
    address saleInitiator;
    uint256 totalBuyEth;
    bool saleStarted;
    bool saleEnded;
    bool saleAborted;
  }
}
