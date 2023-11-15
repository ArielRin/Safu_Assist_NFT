const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Lastman Holding";
const description = "LastManHolding NFT will reward a random existing holder with 10% of the purchase price of last NFT sold. Every NFT purchased will reward a current holder randomly until there is only one left. The last NFT sold will earn a total of 10% (1.5BNB) of the entire treasury, total value of all the NFTS sold. Pricing is currently at base cost of 0.15BNB. Get in early to have more chances to be rewarded and remember! You can always have more than one, which means more chances for rewards. 1 Lastman NFT per transaction with no cap on qty per wallet. Enjoy the Ride!!";
const baseUri = "ipfs://QmcCPpWTL4FxwqXPJLPqRxBiucUd4ZtEtN2tJN7F4mZT98";

const solanaMetadata = {
  symbol: "RACE1",
  seller_fee_basis_points: 300, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://lastmanstanding.info/",
  creators: [
    {
      address: "0x102EE4DdeB7A95Ef9aaAecc14AB93363E3D9B5d5",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Background" },
      { name: "Image" },
      { name: "Edition" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
