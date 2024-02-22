const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log("Deploying TestNFT On Myshell", chainId)

    const nft = await deploy("TestNFT", {
        from: deployer,
        log: true,
        args: [],
    })

    log("TestNFT Deployed!")
    log("TestNFT Address is:", nft.address)
    log("----------------------------------------------------------")
}
module.exports.tags = ["all", "nft"]
