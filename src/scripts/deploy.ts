import hre from "hardhat";
import metadata from "../metadata/metadata.json";
import storage from "../metadata/storage.json";

async function main() {
    // Declare initialization values
    const NAME = "Bulk";
    const SYMBOL = "BLK";
    const MAX_TOKENS = metadata.length;
    const MINT_FEE = 10;
    const BASE_URI = storage.baseURI;
    if (!BASE_URI) throw Error("Base URI error: Base URI cannot be empty");

    // Deploy the contract
    await hre.run("compile");
    const Bulk = await hre.ethers.getContractFactory(NAME);
    const bulk = await Bulk.deploy(NAME, SYMBOL, MAX_TOKENS, MINT_FEE, BASE_URI);
    await bulk.deployed();
    console.log(`${NAME} deployed to: ${bulk.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
