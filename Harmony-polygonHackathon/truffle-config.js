const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeyTest = '776e884d682f64f4d1835b260b42a6a27669355d7b478e30d94e9bb6414a464e';

module.exports = {
  networks: {
    testnet: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic,
          providerOrUrl: 'https://api.s0.b.hmny.io', // https://api.s0.t.hmny.io for mainnet
          derivationPath: `m/44'/1023'/0'/0/`
        });
      },
      network_id: 1666700000, // 1666600000 for mainnet
    },
    testnetHarmony: {
      provider: () => {
        if (!privateKeyTest.trim()) {
          throw new Error(
            'Please enter a private key with funds, you can use the default one'
          );
        }
        return new HDWalletProvider({
          privateKeys: [privateKeyTest],
          providerOrUrl: 'https://api.s0.b.hmny.io',
        });
      },
      network_id: 1666700000,
    },
    compilers: {
      solc: {
        version: "0.4.24"
      }
    }
  },
};
