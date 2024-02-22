const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    },
    202402181658: {
        name: "myshell",
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const TOKEN_ADDRESS = "0x89592D6e441c3aF31Bc96F15347f8aB0718Ff253"
const USER = "0xA5b71068da164ECafAB295838f775Fe90764f786"
const NFT_ADDRESS = "0x62D1b1D72D83c1caC7AD6C59FcD05A6990f5ea59"
const CRYPTO_DEVS_ADDRESS = "0x080849A3dee93E16Ce12bDe9B27b99ceC3EbbbaC"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    TOKEN_ADDRESS,
    USER,
    NFT_ADDRESS,
    CRYPTO_DEVS_ADDRESS,
}
