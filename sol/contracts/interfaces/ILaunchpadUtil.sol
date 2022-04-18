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
    uint256 tokensPerOneBaseCurrency;
    uint64 liquidityUnlockPercentage;
    uint64 liquidityUnlockTimestamp;
    uint64 liquidityUnlockEndTimestamp;
    uint256 maxBuyPerUser;
    uint256 minBuyPerUser;
    uint256 tokenAmountForSale;
    uint256 tokenAmountForLiquidity;
    uint64 publicSaleTimestamp;
    uint64 publicSaleEndTimestamp;
  }

  struct SDescription {
    string name;
    string description;
    string imageUrl;
    uint256 saleId;
    address token;
    uint256 transactionFees;
    address feeBeneficiary;
    address signer;
    address owner;
    bool saleAborted;
    SRouter router;
  }

  struct SLaunchpadExport {
    SInput input;
    SDescription description;
    address vesting_wallet;
    SRound[] rounds;
  }

  struct SRound {
    uint256 startTime;
    uint256 endTime;
    address[] whitelisted;
  }
}
