/**
 *  This script will calculate the constructor arguments for Shiwa.sol and deploy it.
 *  After deploying, you can access the contract on etherscan.io with the deployed contract address.
 */

const hre = require('hardhat')
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const whitelist = require('./whitelist.js')

const BASE_URI = 'ipfs://QmRBbHDan8Et5v4ahChZ5pfYL3Hksu3s37awNSucKksNu7/'
const proxyRegistryAddressGoerli = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
const proxyRegistryAddressMainnet = '0xa5409ec958c83c3f309868babaca7c86dcb077c1'
const fs = require('fs')

async function main() {
  // Calculate merkle root from the whitelist array
  const leafNodes = whitelist.map((addr) => keccak256(addr))
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  const root = merkleTree.getRoot()
  const token = '0xA0A9547Fe031b778CD6788B3a1EC9D86cfcd8046'

  // Deploy the contract
  const SHIWA = await hre.ethers.getContractFactory('SHIWA')
  const Shiwa = await SHIWA.deploy(
    BASE_URI,
    root,
    proxyRegistryAddressGoerli,
    token
  )

  await Shiwa.deployed()

  await updateABI('SHIWA')

  console.log('SHIWA deployed to:', Shiwa.address)
}

const updateABI = async (contractName) => {
  const abiDir = `${__dirname}/../abi`
  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir)
  }
  const Artifact = artifacts.readArtifactSync(contractName)
  fs.writeFileSync(
    `${abiDir}/${contractName}.json`,
    JSON.stringify(Artifact.abi, null, 2)
  )
}

const verify = async (contractAddress, args = []) => {
  // @ts-ignore
  if (network == 'localhost' || network == 'hardhat') return
  try {
    //await updateABI(contractName)
    await hre.run('verify:verify', {
      address: contractAddress,
      constructorArguments: args
    })
  } catch (ex) {
    console.log(ex)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
