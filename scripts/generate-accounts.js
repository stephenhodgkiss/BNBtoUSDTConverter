const ethers = require('ethers');

function main() {
    console.log("\nGenerating 5 test accounts...\n");
    
    for(let i = 0; i < 5; i++) {
        const wallet = ethers.Wallet.createRandom();
        console.log(`Account ${i + 1}:`);
        console.log(`Address: ${wallet.address}`);
        console.log(`Private Key: ${wallet.privateKey}`);
        console.log("-----------------------------------");
    }
    
    console.log("\nIMPORTANT:");
    console.log("1. Save these private keys securely");
    console.log("2. Get test BNB from BSC Testnet Faucet:");
    console.log("   https://testnet.bnbchain.org/faucet-smart");
    console.log("\n");
}

main();
