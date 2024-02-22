const { network } = require("hardhat")

const MAX_WHITE_LISTED_ADDRESSES = 200

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log("Deploying Whitelist On Myshell", chainId)

    const list = await deploy("Whitelist", {
        from: deployer,
        log: true,
        args: [MAX_WHITE_LISTED_ADDRESSES],
    })

    log("Deploying CryptoDevs On Myshell", chainId)

    const cd = await deploy("CryptoDevs", {
        from: deployer,
        log: true,
        args: [list.address],
    })

    log("CryptoDevs Deployed!")
    log("CryptoDevs Address is:", cd.address)
    log("----------------------------------------------------------")
}
module.exports.tags = ["all", "cd"]
