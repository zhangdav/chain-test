const { ethers } = require("hardhat")
const { TOKEN_ADDRESS, USER } = require("../helper-hardhat-config")

async function transfer() {
    const [owner] = await ethers.getSigners()
    const token = await ethers.getContractAt("TestToken", TOKEN_ADDRESS, owner)

    const balanceOwnerBefore = await token.balanceOf(owner.address)
    console.log(`Owner balance before: ${balanceOwnerBefore.toString()}`)

    const balanceUserBefore = await token.balanceOf(USER)
    console.log(`User balance before: ${balanceUserBefore.toString()}`)

    console.log("transfer 10 Token to User...")
    const transferAmount = ethers.utils.parseUnits("10", 18)
    const transferTx = await token.transfer(USER, transferAmount)

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

    const balanceOwnerAfter = await token.balanceOf(owner.address)
    console.log(`Owner balance after: ${balanceOwnerAfter.toString()}`)

    const balanceUserAfter = await token.balanceOf(USER)
    console.log(`User balance after: ${balanceUserAfter.toString()}`)
}

transfer()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
