require("dotenv").config()
const { ethers } = require("hardhat")

const myshellUrl = process.env.MYSHELL_RPC_URL
const provider = new ethers.providers.JsonRpcProvider(myshellUrl)

async function providers() {
    // Current network chainId
    const network = await provider.getNetwork()
    console.log("Current network chainId:", network.chainId)

    // Get Current Block Number
    console.log("Current block number", await provider.getBlockNumber())

    // Get my balance
    const userOneBalance = await provider.getBalance("0xeb23E1a2784931A65D671DaA1235c8ae6435A367")
    console.log("user one balance is", ethers.utils.formatEther(userOneBalance))

    // send 1.5 ETH(toString() is Wei)
    console.log("1.5 ETH is", ethers.utils.formatEther(ethers.utils.parseEther("1.5")))

    // User1 balance more than user2
    const userTwoBalance = await provider.getBalance("0xA5b71068da164ECafAB295838f775Fe90764f786")
    console.log("user two balance is", ethers.utils.formatEther(userTwoBalance))

    if (userOneBalance.gt(userTwoBalance)) {
        console.log("userOneBalance more than userTwoBalance")
    } else {
        console.log("userTwoBalance more than userOneBalance")
    }

    console.log("user one balance has:", ethers.utils.formatEther(userOneBalance))
    console.log("user two balance has:", ethers.utils.formatEther(userTwoBalance))

    // Add some value to user1, user1 balance more than user2
    const userOneBalanceBefore = await provider.getBalance(
        "0xeb23E1a2784931A65D671DaA1235c8ae6435A367",
    )
    let userTwoBalanceBefore = await provider.getBalance(
        "0xA5b71068da164ECafAB295838f775Fe90764f786",
    )
    const userTwoBalanceAfter = userTwoBalanceBefore.add(ethers.utils.parseEther("5000"))

    if (userTwoBalanceAfter.gt(userOneBalanceBefore)) {
        console.log("userTwoBalanceAfter more than userOneBalanceBefore")
    } else {
        console.log("userOneBalanceBefore more than userTwoBalanceAfter")
    }

    console.log("user one balance has:", ethers.utils.formatEther(userOneBalanceBefore))
    console.log("user two balance has:", ethers.utils.formatEther(userTwoBalanceAfter))
}

providers()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
