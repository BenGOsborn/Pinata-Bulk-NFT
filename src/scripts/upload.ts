import pinataSDK from "@pinata/sdk";
import dotenv from "dotenv";
dotenv.config();

async function main() {
    // Initialize pinata
    const PINATA_API_KEY = process.env.PINATA_API_KEY as string;
    const PINATA_API_SECRET = process.env.PINATA_API_SECRET as string;
    const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
