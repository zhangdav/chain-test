# Myshell Testnet Smart Contract Initial Test

![logo](https://github.com/Solidityarchitect/Chain-Test/assets/125990317/545d75a6-2cfc-4150-a5d8-e69e6f607a08)

Overall, the Myshell testnet runs reliably, with fast transaction confirmations and reasonable gas usage. These transactions provide confidence in the deployment and functionality of the TestToken smart contract, demonstrating that it behaves as expected for basic operations such as testnet transfers and approvals. Further testing, including edge cases and failure modes, is recommended before any mainnet deployment for a thorough assessment.

**_Myshell Testnet Smart Contract Test Report_**

**_David Zhang_**

**_February 21, 2024_**

Install environment

```shell
yarn
```

Setting .env

```shell
MYSHELL_RPC_URL=https://myshell-testnet.alt.technology
DEPLOYER_PRIVATE_KEY=""
USER_PRIVATE_KEY=""
```

Deploy smart contract

```shell
yarn hardhat deploy --network myshell
```

Start testing

```shell
yarn hardhat run scripts/transfer.js --network myshell
yarn hardhat run scripts/transferFrom.js --network myshell
yarn hardhat run scripts/mint.js --network myshell
yarn hardhat run scripts/nftTransferFrom.js --network myshell
```
