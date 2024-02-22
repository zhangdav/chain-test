const { ethers } = require("hardhat")
const { CRYPTO_DEVS_ADDRESS } = require("../helper-hardhat-config")

async function read() {
    const [owner] = await ethers.getSigners()
    const cryptoDevsContract = await ethers.getContractAt("CryptoDevs", CRYPTO_DEVS_ADDRESS, owner)

    const mintPrice = await cryptoDevsContract._price()
    console.log("mint price:", ethers.utils.formatEther(mintPrice))
}

read()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
