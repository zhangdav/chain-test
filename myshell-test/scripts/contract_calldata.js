const { ethers } = require("hardhat")
const { CRYPTO_DEVS_ADDRESS } = require("../helper-hardhat-config")

async function calldata() {
    const [owner] = await ethers.getSigners()
    const cryptoDevsContract = await ethers.getContractAt("CryptoDevs", CRYPTO_DEVS_ADDRESS, owner)

    console.log("mint price is:", ethers.utils.formatEther(await cryptoDevsContract._price()))

    const mintPrce = ethers.utils.parseEther("0.0001")

    const calldata = "0x1249c58b"

    const nonce = await owner.getTransactionCount()
    console.log("current transaction nonce is", nonce)

    const mintTx = await owner.sendTransaction({
        to: CRYPTO_DEVS_ADDRESS,
        value: mintPrce,
        data: calldata,
        nonce: nonce,
        gasPrice: 100000000000,
        gasLimit: 1000000,
    })
    const receiptTx = await mintTx.wait(1)

    console.log("block confirmation...")

    console.log("Transaction successfully...")

    const transactionHash = receiptTx.transactionHash
    console.log(`Transaction Hash: ${transactionHash}`)

    const transactionDetails = await ethers.provider.getTransaction(transactionHash)
    console.log(`Transaction Details:`, transactionDetails)
}

calldata()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
