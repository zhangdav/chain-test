const { ethers } = require("hardhat")
const { NFT_ADDRESS } = require("../helper-hardhat-config")

async function nftTransferFrom() {
    const [owner, user] = await ethers.getSigners()
    const nft = await ethers.getContractAt("TestNFT", NFT_ADDRESS, owner)

    const tokenId = (await nft.getTokenCounter()).toNumber() - 1
    console.log(`Newly minted Token ID: ${tokenId}`)

    const oldOwner = await nft.ownerOf(tokenId)
    console.log(`New owner of tokenId ${tokenId} is: ${oldOwner}`)

    console.log(`Approving user to transfer the tokenId ${tokenId} from owner...`)
    const approveTx = await nft.connect(owner).approve(user.address, tokenId)
    await approveTx.wait(1)

    console.log(`Transferring tokenId ${tokenId} from owner to user...`)
    const transferTx = await nft
        .connect(user)
        .safeTransferFrom(owner.address, user.address, tokenId)
    await transferTx.wait(1)

    console.log("Waiting for transactions to be mined...")
    const receiptTx = await transferTx.wait(1)

    console.log("Transaction successfully...")

    const transactionHash = receiptTx.transactionHash
    console.log(`Transaction Hash: ${transactionHash}`)

    const transactionDetails = await ethers.provider.getTransaction(transactionHash)
    console.log(`Transaction Details:`, transactionDetails)

    const block = await ethers.provider.getBlock(transactionDetails.blockNumber)
    const blockTimestamp = block.timestamp
    console.log(`Block Timestamp: ${new Date(blockTimestamp * 1000).toISOString()}`)

    const newOwner = await nft.ownerOf(tokenId)
    console.log(`New owner of tokenId ${tokenId} is: ${newOwner}`)

    console.log("Verifying ownership...")
    const ownerOfTokenId = await nft.ownerOf(tokenId)
    console.log(`Owner of the tokenId ${tokenId} is now: ${ownerOfTokenId}`)
    if (ownerOfTokenId === user.address) {
        console.log(`Token ID ${tokenId} successfully transferred to user.`)
    } else {
        console.error(`Transfer of token ID ${tokenId} failed.`)
    }
}

nftTransferFrom()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
