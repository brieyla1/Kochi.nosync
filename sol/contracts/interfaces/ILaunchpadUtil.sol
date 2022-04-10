// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ILaunchpadUtil {
  enum ERouter {
    uniswap,
    pancakeswap
  }

  struct SRouter {
    ERouter name;
    address addr;
  }

  struct SSale {
    string name;
    uint256 saleId;
    address addr;
  }

  struct SInput {
    uint256 tokenTotalAmount;
    uint256 listingTokensPerOneBaseCurrency;
    uint256 hardcap;
    uint256 softcap;
    uint256 transactionFees;
    uint256 tokensPerOneBaseCurrency;
    uint256 liquidityShare;
    uint256 liquidityUnlockTimestamp;
    uint256 maxBuyPerUser;
    uint256 minBuyPerUser;
    uint256 tokenAmountForSale;
    uint256 tokenAmountForLiquidity;
  }

  struct SDescription {
    string name;
    string description;
    string imageUrl;
    uint256 saleId;
    address token;
    address feeBeneficiary;
    address signer;
    address owner;
    SRouter router;
  }

  struct STokenomics {
    bool saleStarted;
    bool saleEnded;
    bool saleAborted;
  }

  struct SLaunchpadExport {
    SInput input;
    SDescription description;
    STokenomics tokenomics;
  }

  struct SRound {
    uint256 startTime;
    uint256 endTime;
    address[] whitelisted;
  }
}
