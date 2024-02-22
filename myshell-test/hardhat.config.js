require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("dotenv").config()

const MYSHELL_RPC_URL = process.env.MYSHELL_RPC_URL
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY
const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        myshell: {
            url: MYSHELL_RPC_URL,
            accounts: [DEPLOYER_PRIVATE_KEY, USER_PRIVATE_KEY],
            chainId: 202402181658,
        },
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.20",
            },
            {
                version: "0.8.19",
            },
        ],
    },
    mocha: {
        timeout: 500000,
    },
}
