const hre = require("hardhat");

async function main() {
  console.log("Deploying BNBtoUSDTConverter...");

  const BNBtoUSDTConverter = await hre.ethers.getContractFactory("BNBtoUSDTConverter");
  const converter = await BNBtoUSDTConverter.deploy();
  
  await converter.waitForDeployment();
  const converterAddress = await converter.getAddress();
  
  console.log("\nBNBtoUSDTConverter deployed to:", converterAddress);
  console.log("\nTo use the contract:");
  console.log("1. Send BNB to this address:", converterAddress);
  console.log("2. You'll automatically receive 95% of the value in USDT");
  console.log("3. The conversion is done through PancakeSwap");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
