require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-contract-sizer");
require("@openzeppelin/hardhat-upgrades");
// require('dotenv').config({ path: '../.env' });
require("@chainlink/env-enc").config();

const SOL_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 1_000,
  },
};

module.exports = {
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: SOL_SETTINGS,
      },
      {
        version: "0.8.1",
        settings: SOL_SETTINGS,
      },
      {
        version: "0.8.9",
        settings: SOL_SETTINGS,
      },
      {
        version: "0.8.11",
        settings: SOL_SETTINGS,
      },
      {
        version: "0.8.17",
        settings: SOL_SETTINGS,
      },
    ],
  },
 
  defaultNetwork: "mumbai",

  networks: {

    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY_DEV],
      chainId: 80001,
    },
  },
};
