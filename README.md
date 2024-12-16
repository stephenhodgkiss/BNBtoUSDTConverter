# BNB to USDT Converter

A smart contract deployed on Binance Smart Chain (BSC) that automatically converts BNB to USDT.

## Contract Details

- **Network**: BSC Mainnet
- **Contract Address**: 0x8f17894A070eDbF1AD9b6fd520cbF887EafCac72
- **Verified on BSCScan**: 

## How to Use

1. Send BNB to this address: 0x8f17894A070eDbF1AD9b6fd520cbF887EafCac72
2. You'll automatically receive 95% of the value in USDT, allowing for slippage. All funds remain.
3. The conversion is done through PancakeSwap

## Features

- Automatically converts 95% of the new BNB balance to USDT
- Sends USDT directly back to the sender
- Uses PancakeSwap for swapping
- Owner can withdraw remaining BNB or tokens if needed

## Technical Details

- Uses PancakeSwap Router: 0x10ED43C718714eb63d5aA57B78B54704E256024E
- USDT Token Address: 0x55d398326f99059fF775485246999027B3197955
- Solidity Version: ^0.8.19
- Optimization: Enabled (200 runs)

## Security Features

- Only the contract owner can withdraw BNB or tokens
- All transactions are handled through verified PancakeSwap router
- Contract is verified and open source on BSCScan.com