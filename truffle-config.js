module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545,        // Standard Ethereum port (default: none)
      network_id: "*",   // Any network (default: none)
    },
  },
  compilers: {
    solc: {
      version: "0.8.9",  // Specify the exact version of Solidity you want to use
    },
  },
};

