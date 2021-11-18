import pinataSDK, { PinataPinResponse } from "@pinata/sdk";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

async function main() {
    // Initialize pinata
    const PINATA_API_KEY = process.env.PINATA_API_KEY as string;
    const PINATA_API_SECRET = process.env.PINATA_API_SECRET as string;
    const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

    // Load in the metadata
    const metadata = JSON.parse(fs.readFileSync("metadata/metadata.json", "utf8"));
    const uploadedPromise: Promise<PinataPinResponse>[] = [];
    for (const item of metadata) {
        const filePath = `metadata/images/${item.image}`;
        const file = fs.createReadStream(filePath);
        uploadedPromise.push(pinata.pinFileToIPFS(file, { pinataOptions: { wrapWithDirectory: true } }));
    }

    // Wait for all of the uploads
    const uploaded = await Promise.all(uploadedPromise);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
