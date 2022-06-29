// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract EthBridge is AccessControl {

    using SafeERC20 for IERC20;

    address public token;

    event SwappedFromEth(address indexed token, address indexed from, uint256 amount);
    event AcceptedSwapFromBsc(address indexed token, address indexed from, uint256 amount);

    constructor(address _admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, _admin);
    }

    function swapFromEth(address _token, uint256 _amount) external {
        require(msg.sender != address(0), "ZERO_ADDRESS");
        require(_token != address(0), "ZERO_ADDRESS");
        require(_amount > 0, "ZERO_AMOUNT");
        IERC20(token).safeTransferFrom(msg.sender, address(this), _amount);
        emit SwappedFromEth(_token, msg.sender, _amount);
    }

    function acceptSwapFromBsc(address _from, address _token, uint256 _amount) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not a admin");
        require(_from != address(0), "ZERO_ADDRESS");
        require(_token != address(0), "ZERO_ADDRESS");
        require(_amount > 0, "ZERO_AMOUNT");
        IERC20(token).safeTransfer(_from, _amount);
        emit AcceptedSwapFromBsc(_token, _from, _amount);
    }
}