const { ethers } = require("hardhat")
const { TOKEN_ADDRESS } = require("../helper-hardhat-config")

async function transferFrom() {
    const [owner, user] = await ethers.getSigners()
    const token = await ethers.getContractAt("TestToken", TOKEN_ADDRESS, owner)

    const balanceOwnerBefore = await token.balanceOf(owner.address)
    console.log(`Owner balance before: ${balanceOwnerBefore.toString()}`)

    const balanceUserBefore = await token.balanceOf(user.address)
    console.log(`User balance before: ${balanceUserBefore.toString()}`)

    const transferAmount = ethers.utils.parseUnits("25", 18)

    console.log("approve...")
    const approveTx = await token.connect(owner).approve(user.address, transferAmount)
    await approveTx.wait(1)

    console.log("transfer 25 Token to User...")
    const transferTx = await token
        .connect(user)
        .transferFrom(owner.address, user.address, transferAmount, {
            gasLimit: 1000000,
        })

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

    const balanceUserAfter = await token.balanceOf(user.address)
    console.log(`User balance after: ${balanceUserAfter.toString()}`)
}

transferFrom()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
