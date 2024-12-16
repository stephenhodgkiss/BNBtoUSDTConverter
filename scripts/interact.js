const hre = require("hardhat");

async function main() {
    const MOCK_USDT = "0x148A50B0D3bC4ec5170B544f5FDFE8D840DE858d";
    const MOCK_ROUTER = "0xC20F9f82Ec6bC2B92625127fEFBf0B1795C31410";
    const CONVERTER = "0x7e0a45156b91889F7d044bEE2df6061f3705EaED";
    
    console.log("Getting contract instances...");
    const MockToken = await hre.ethers.getContractFactory("MockToken");
    const mockUSDT = MockToken.attach(MOCK_USDT);
    
    const BNBtoUSDTConverter = await hre.ethers.getContractFactory("BNBtoUSDTConverter");
    const converter = BNBtoUSDTConverter.attach(CONVERTER);
    
    // Get a signer
    const [signer] = await hre.ethers.getSigners();
    console.log("Using account:", await signer.getAddress());
    
    // Check balances before
    const bnbBalanceBefore = await hre.ethers.provider.getBalance(signer.address);
    const usdtBalanceBefore = await mockUSDT.balanceOf(signer.address);
    
    console.log("\nInitial Balances:");
    console.log("BNB:", hre.ethers.formatEther(bnbBalanceBefore), "BNB");
    console.log("USDT:", hre.ethers.formatEther(usdtBalanceBefore), "USDT");
    
    // Send 1 BNB to converter
    console.log("\nSending 1 BNB to converter...");
    const tx = await signer.sendTransaction({
        to: CONVERTER,
        value: hre.ethers.parseEther("1")
    });
    
    console.log("Transaction hash:", tx.hash);
    await tx.wait();
    console.log("Transaction completed!");
    
    // Check balances after
    const bnbBalanceAfter = await hre.ethers.provider.getBalance(signer.address);
    const usdtBalanceAfter = await mockUSDT.balanceOf(signer.address);
    
    console.log("\nFinal Balances:");
    console.log("BNB:", hre.ethers.formatEther(bnbBalanceAfter), "BNB");
    console.log("USDT:", hre.ethers.formatEther(usdtBalanceAfter), "USDT");
    
    console.log("\nChanges:");
    console.log("BNB Spent:", hre.ethers.formatEther(bnbBalanceBefore - bnbBalanceAfter), "BNB");
    console.log("USDT Received:", hre.ethers.formatEther(usdtBalanceAfter - usdtBalanceBefore), "USDT");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
