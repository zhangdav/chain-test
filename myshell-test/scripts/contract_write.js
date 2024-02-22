const { ethers } = require("hardhat")
const { CRYPTO_DEVS_ADDRESS } = require("../helper-hardhat-config")

async function write() {
    const [owner] = await ethers.getSigners()
    const cryptoDevsContract = await ethers.getContractAt("CryptoDevs", CRYPTO_DEVS_ADDRESS, owner)

    console.log("Minting...")
    const mintPrice = await cryptoDevsContract._price()
    console.log("mint price is:", ethers.utils.formatEther(mintPrice))

    const mintTx = await cryptoDevsContract.mint({
        value: mintPrice,
    })

    const receiptTx = await mintTx.wait(1)

    console.log("block confirmation...")

    console.log("Transaction successfully...")

    const transactionHash = receiptTx.transactionHash
    console.log(`Transaction Hash: ${transactionHash}`)

    const transactionDetails = await ethers.provider.getTransaction(transactionHash)
    console.log(`Transaction Details:`, transactionDetails)
}
write()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
