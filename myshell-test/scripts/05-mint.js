const { ethers } = require("hardhat")
const { NFT_ADDRESS } = require("../helper-hardhat-config")

async function mint() {
    const [owner] = await ethers.getSigners()
    const nft = await ethers.getContractAt("TestNFT", NFT_ADDRESS)

    console.log("Minting...")
    const mintTx = await nft.connect(owner).mintNft()

    console.log("Waiting for transactions to be mined...")
    const receiptTx = await mintTx.wait(1)

    console.log("Transaction successfully...")

    const transactionHash = receiptTx.transactionHash
    console.log(`Transaction Hash: ${transactionHash}`)

    const transactionDetails = await ethers.provider.getTransaction(transactionHash)
    console.log(`Transaction Details:`, transactionDetails)

    const block = await ethers.provider.getBlock(transactionDetails.blockNumber)
    const blockTimestamp = block.timestamp
    console.log(`Block Timestamp: ${new Date(blockTimestamp * 1000).toISOString()}`)

    const currentTokenId = (await nft.getTokenCounter()).toNumber() - 1
    console.log(`Current Token ID: ${currentTokenId}`)

    const tokenExists = await nft.getTokenExists(currentTokenId)
    console.log(`Token ID ${currentTokenId} exists: ${tokenExists}`)

    const tokenUri = await nft.tokenURI(currentTokenId)
    console.log(`Token ID ${currentTokenId} URI: ${tokenUri}`)
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
