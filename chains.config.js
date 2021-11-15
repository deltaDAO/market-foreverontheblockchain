// chain configs in ocean.js ConfigHelperConfig format
// see: https://github.com/oceanprotocol/ocean.js/blob/e07a7cb6ecea12b39ed96f994b4abe37806799a1/src/utils/ConfigHelper.ts#L8
// networkId is required, since its used to look for overwrites
// all other fields are first loaded from ocean.js and are optional
// import { ConfigHelperConfig } from '@oceanprotocol/lib'
const metadataCacheUri = require('./app.config')

// type ConfigHelperConfigOverwrite = Partial<ConfigHelperConfig> &
//   Required<Pick<ConfigHelperConfig, 'networkId'>>

// const chains: { [name: string]: ConfigHelperConfigOverwrite } = {
const chains = {
  GaiaXTestnet: {
    networkId: 2021000,
    nodeUri: 'https://rpc.gaiaxtestnet.oceanprotocol.com/',
    metadataCacheUri: metadataCacheUri,
    providerUri: 'https://provider.gaiax.delta-dao.com/',
    explorerUri: 'https://blockscout.gaiaxtestnet.oceanprotocol.com/',
    isDefault: true,
    isSupported: true
  },
  CatenaXTestnet: {
    networkId: 2021001,
    nodeUri: 'https://rpc.catenaxtestnet.oceanprotocol.com/',
    metadataCacheUri: metadataCacheUri,
    providerUri: 'https://provider.catenax.delta-dao.com/',
    explorerUri: 'https://blockscout.catenaxtestnet.oceanprotocol.com/',
    isDefault: true,
    isSupported: true
  },
  RinkebyTestnet: {
    networkId: 4,
    providerUri: 'https://provider.rinkeby.delta-dao.com',
    isDefault: false,
    isSupported: true
  },
  RopstenTestnet: {
    networkId: 3,
    providerUri: 'https://provider.ropsten.delta-dao.com',
    isDefault: false,
    isSupported: false
  }
}

module.exports = chains
