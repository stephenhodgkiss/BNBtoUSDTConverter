// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MockToken.sol";

contract MockRouter {
    address public immutable WETH;
    uint256 public constant RATE = 300; // 1 BNB = 300 USDT

    constructor() {
        WETH = address(this);
    }

    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts) {
        require(deadline >= block.timestamp, "Expired");
        require(path[0] == WETH, "Invalid path");
        
        uint256 amountOut = (msg.value * RATE);
        require(amountOut >= amountOutMin, "Insufficient output amount");
        
        MockToken token = MockToken(path[path.length - 1]);
        token.transfer(to, amountOut);
        
        amounts = new uint[](2);
        amounts[0] = msg.value;
        amounts[1] = amountOut;
        
        return amounts;
    }
}
