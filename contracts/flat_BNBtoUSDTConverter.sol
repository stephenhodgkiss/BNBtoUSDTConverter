// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IPancakeRouter02 {
    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);
    
    function WETH() external pure returns (address);
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract BNBtoUSDTConverter {
    // BSC Mainnet Addresses
    address private constant PANCAKE_ROUTER = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
    address private constant USDT = 0x55d398326f99059fF775485246999027B3197955;
    
    IPancakeRouter02 public immutable pancakeRouter;
    address public immutable owner;
    uint256 private constant CONVERSION_PERCENTAGE = 95;
    
    event Converted(
        address indexed sender,
        uint256 totalBalance,
        uint256 bnbConverted,
        uint256 usdtReceived
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        pancakeRouter = IPancakeRouter02(PANCAKE_ROUTER);
        owner = msg.sender;
    }
    
    receive() external payable {
        require(msg.value > 0, "Must send BNB");
        
        // Get total contract balance after receiving BNB
        uint256 totalBalance = address(this).balance;
        
        // Calculate 95% of total balance
        uint256 bnbToConvert = (totalBalance * CONVERSION_PERCENTAGE) / 100;
        
        // Setup the swap path
        address[] memory path = new address[](2);
        path[0] = pancakeRouter.WETH();
        path[1] = USDT;
        
        // Perform the swap and send USDT directly to sender
        uint[] memory amounts = pancakeRouter.swapExactETHForTokens{value: bnbToConvert}(
            0, // Accept any amount of USDT
            path,
            msg.sender, // Send USDT directly to the sender
            block.timestamp + 300
        );
        
        emit Converted(
            msg.sender,
            totalBalance,    // Total balance when conversion started
            bnbToConvert,    // Amount of BNB converted (95% of total)
            amounts[1]       // Amount of USDT received
        );
    }
    
    // Emergency withdrawal functions for owner
    function withdrawBNB() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function withdrawToken(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner, amount);
    }
    
    // View functions
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
