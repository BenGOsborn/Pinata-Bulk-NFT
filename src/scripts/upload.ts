import FormData from "form-data";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

async function main() {
    // Initialize pinata
    const PINATA_API_KEY = process.env.PINATA_API_KEY as string;
    const PINATA_API_SECRET = process.env.PINATA_API_SECRET as string;

    // Load in the metadata
    const metadata = JSON.parse(fs.readFileSync("metadata/metadata.json", "utf8"));
    const files: fs.ReadStream[] = [];
    for (const item of metadata) {
        const filePath = `metadata/images/${item.image}`;
        const file = fs.createReadStream(filePath);
        files.push(file);
    }
    const uploaded = await pinata.pinFileToIPFS(files, { pinataOptions: { wrapWithDirectory: true } });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
