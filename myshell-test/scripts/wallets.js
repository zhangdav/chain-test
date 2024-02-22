const { ethers } = require("hardhat")
require("dotenv").config()

const myshellUrl = process.env.MYSHELL_RPC_URL
const provider = new ethers.providers.JsonRpcProvider(myshellUrl)

async function wallets() {
    // Current network chainId
    const network = await provider.getNetwork()
    console.log("Current network chainId:", network.chainId)

    // Create a random wallet on myshell
    let randomWallet = ethers.Wallet.createRandom()
    let wallet = randomWallet.connect(provider)

    console.log("address:", wallet.address)
    console.log("private Key:", wallet.privateKey)
    console.log("mnemonic:", wallet.mnemonic.phrase)

    // // Create 10 accounts from mnemonic
    let path, myWallet

    for (let i = 0; i < 10; i++) {
        path = `m/44'/60'/0'/0/0${i}`
        myWallet = ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, path).connect(provider)
        console.log("address:", i, wallet.address)
        console.log("private key:", i, wallet.privateKey)
    }

    // use a wallet from private key
    const signer = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider)
    console.log("My wallet address(from private key):", signer.address)

    // sign and verify a message
    console.log("Is signer?", signer._isSigner)
    const signature = await signer.signMessage("hello web3")
    console.log("Signed message", signature)

    const signerAddress = ethers.utils.verifyMessage("hello web3", signature)
    console.log("signerAddress", signerAddress)
    console.log("signer address", signer.address)

    // send a transaction
    const myBalance = await provider.getBalance(signer.address)
    console.log("my Balance", ethers.utils.formatEther(myBalance))
    console.log("my Address", signer.address)

    const userTwoBalance = await provider.getBalance("0xA5b71068da164ECafAB295838f775Fe90764f786")
    console.log("user two balance is", ethers.utils.formatEther(userTwoBalance))

    console.log("send transaction to user2")
    const sendTx = await signer.sendTransaction({
        to: "0xA5b71068da164ECafAB295838f775Fe90764f786",
        value: ethers.utils.parseEther("0.0001"), // send 0.0001 ETH to user2
    })
    console.log("sending...")

    const receiptTx = await sendTx.wait(3)

    console.log(sendTx)

    console.log("block confirmation...")

    console.log("Transaction successfully...")

    const transactionHash = receiptTx.transactionHash
    console.log(`Transaction Hash: ${transactionHash}`)

    const transactionDetails = await ethers.provider.getTransaction(transactionHash)
    console.log(`Transaction Details:`, transactionDetails)

    const block = await ethers.provider.getBlock(transactionDetails.blockNumber)
    const blockTimestamp = block.timestamp
    console.log(`Block Timestamp: ${new Date(blockTimestamp * 1000).toISOString()}`)
}

wallets()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
