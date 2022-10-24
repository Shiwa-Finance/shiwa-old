/**
 *  This script will calculate the constructor arguments for the `verify` function and call it.
 *  You can use this script to verify the contract on etherscan.io.
 */

require('@nomiclabs/hardhat-etherscan')
const hre = require('hardhat')
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const whitelist = require('./whitelist.js')

const BASE_URI = 'ipfs://QmRBbHDan8Et5v4ahChZ5pfYL3Hksu3s37awNSucKksNu7/'
const proxyRegistryAddressGoerli = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
const proxyRegistryAddressMainnet = '0xa5409ec958c83c3f309868babaca7c86dcb077c1'

async function main() {
  // Calculate merkle root from the whitelist array
  const leafNodes = whitelist.map((addr) => keccak256(addr))
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  const root = merkleTree.getRoot()
  const token = '0xA0A9547Fe031b778CD6788B3a1EC9D86cfcd8046'

  await hre.run('verify:verify', {
    address: '0xfaf7C6EBF24B2ADa72aae1DC17d6B31639dbeb91', // Deployed contract address
    constructorArguments: [BASE_URI, root, proxyRegistryAddressGoerli, token]
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
