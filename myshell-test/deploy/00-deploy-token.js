const { network, ethers } = require("hardhat")

const INITIAL_SUPPLY = ethers.utils.parseEther("1000")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log("Deploying TestToken On Myshell", chainId)

    const token = await deploy("TestToken", {
        from: deployer,
        log: true,
        args: [INITIAL_SUPPLY],
    })

    log("TestToken Deployed!")
    log("TestToken Address is:", token.address)
    log("----------------------------------------------------------")
}
module.exports.tags = ["all", "token"]
