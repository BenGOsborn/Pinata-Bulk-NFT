# [Pinata Bulk NFT Uploader](https://testnet.snowtrace.io/address/0x1aeC9f52DC4308C049a9dCf1af9b2F0aef9249fa)

## Bulk uploads NFT metadata to Pinata and deploys the NFT contract with the generated base URI.

### Description

Uploading massive amounts of NFT assets and metadata without gas fees has never been easier. This script utilizes the [Pinata API](https://www.pinata.cloud) so that you can simply specify your assets and metadata, run the script, and generate your own NFT project within minutes with all of the data stored on [IPFS](https://ipfs.io) and the blockchain. The network used by default is the [Avalanche Fuji test network](https://testnet.snowtrace.io), however you can change it to be whatever you want in `hardhat.config.ts`.

### Requirements

-   Node==v10.19.0
-   NPM=6.14.4

### Instructions

1. Make a new `.env` file in `src` and inside of it specify your private key `PRIVATE_KEY=`, your Pinata API key `PINATA_API_KEY=`, and your Pinata API secret key `PINATA_API_SECRET=`
2. Fund your wallet with test [AVAX](https://faucet.avax-test.network) for the Avalanche Fuji test network
3. Run `npm install`
4. Store your assets in `metadata/images` and your metdata in `metadata/metadata.json`. Inside of the `metadata/metadata.json`, set the `image` attribute of each token to the filename of your asset in the `metadata/images`
5. To upload the images to Pinata and IPFS run `npm run upload`, and then to deploy the contract with the metadata run `npm run deploy`
