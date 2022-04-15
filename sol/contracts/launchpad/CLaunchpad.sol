// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "contracts/interfaces/ILaunchpad.sol";
import "contracts/launchpad/CPresale.sol";
import "contracts/interfaces/ILaunchpadUtil.sol";

// console
import "hardhat/console.sol";

contract Launchpad is Ownable, ReentrancyGuard, Pausable {
  event Deployed(address addr, uint256 salt);

  mapping(uint256 => address) public saleToSigner;
  mapping(uint256 => ILaunchpadUtil.SSale) public sale_id_to_sale;

  uint256 public current_sale_id;

  uint256 public transaction_fee;
  uint256 public presale_creation_fee;
  address public signer;
  address payable public feesWallet;
  Presale public presale;
  address public presale_address;

  event SaleCreated(uint256 sale_id, address sale_address);

  constructor(
    uint256 _transaction_fees,
    uint256 _presale_creation_fee,
    address _feesWallet
  ) {
    presale_creation_fee = _presale_creation_fee;
    transaction_fee = _transaction_fees;
    feesWallet = payable(_feesWallet);
    signer = msg.sender;

    current_sale_id = 0;
  }

  function createPresale(
    address _token,
    string memory _name,
    string memory _description,
    string memory _imageUrl,
    ILaunchpadUtil.SRouter memory router,
    ILaunchpadUtil.SInput memory financials,
    ILaunchpadUtil.SRound[] memory rounds
  ) external payable whenNotPaused nonReentrant returns (address saleAddress) {
    saleToSigner[current_sale_id] = signer;

    require(msg.value >= presale_creation_fee, "Insufficient funds to deploy the presale");

    presale = new Presale(
      financials,
      ILaunchpadUtil.SDescription(
        _name,
        _description,
        _imageUrl,
        current_sale_id,
        _token,
        transaction_fee,
        feesWallet,
        msg.sender,
        owner(),
        false,
        router
      ),
      rounds
    );
    saleAddress = address(presale);

    // transfer the erc20 tokens
    IERC20(_token).transferFrom(msg.sender, saleAddress, financials.tokenTotalAmount);

    // Update the registry
    ILaunchpadUtil.SSale memory sale = ILaunchpadUtil.SSale(_name, current_sale_id, presale_address);

    sale_id_to_sale[current_sale_id] = sale;
    current_sale_id = current_sale_id + 1;

    emit SaleCreated(current_sale_id, saleAddress);

    return saleAddress;
  }

  // return a list of Sales
  function getSales() external view returns (ILaunchpadUtil.SSale[] memory) {
    ILaunchpadUtil.SSale[] memory sales = new ILaunchpadUtil.SSale[](current_sale_id);
    for (uint256 i = 0; i < current_sale_id; i++) {
      ILaunchpadUtil.SSale memory sale = sale_id_to_sale[i];
      sales[i] = sale;
    }
    return (sales);
  }

  function claimFees() external nonReentrant {
    require(msg.sender == feesWallet, "Not Authorized, only the feesWallet is allowed to claim the fees");
    payable(feesWallet).call{value: address(this).balance}("");
  }

  function setSigner(address _signer) external onlyOwner {
    signer = _signer;
  }

  function setfees(uint256 _fees) external onlyOwner {
    transaction_fee = _fees;
  }

  function setPresaleCreationFee(uint256 _presale_creation_fee) external onlyOwner {
    presale_creation_fee = _presale_creation_fee;
  }

  receive() external payable {}
}
