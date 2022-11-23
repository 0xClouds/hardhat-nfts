const { network, getNamedAccounts, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, logs } = deployments
    const deployer = getNamedAccounts()
    log("-----------------")
    const args = []
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if(!developmentChains.includes(network.name) &7 process.env.ETHERSCAN_API_KEY){
        log("Verifying...")
        await verify(basicNFT.address, args)
    }
}

module.exports.tags = ["all", "basicnft", "main"]
