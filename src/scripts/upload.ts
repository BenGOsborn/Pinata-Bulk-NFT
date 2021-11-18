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
    const imgFormData = new FormData();
    for (const item of metadata) {
        const filePath = `metadata/images/${item.image}`;
        const file = fs.createReadStream(filePath);
        imgFormData.append("file", file, { filepath: `images/${item.image}` });
    }

    // Upload the images to IPFS
    const responseImg = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", imgFormData, {
        maxBodyLength: "Infinity" as any,
        headers: {
            "Content-Type": `multipart/form-data; boundary=${imgFormData.getBoundary()}`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
        },
    });
    const ipfsBaseImageURI = `https://ipfs.io/ipfs/${responseImg.data.IpfsHash}` as string;

    // Upload the metadata to IPFS
    const jsonFormData = new FormData();
    for (const [i, item] of metadata.entries()) {
        item.image = `${ipfsBaseImageURI}/${item.image}`;
        const file = Buffer.from(item);
        jsonFormData.append("file", file, { filepath: `json/${i}.json` });
    }

    // Upload the JSON to IPFS
    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", jsonFormData, {
        maxBodyLength: "Infinity" as any,
        headers: {
            "Content-Type": `multipart/form-data; boundary=${jsonFormData.getBoundary()}`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_API_SECRET,
        },
    });
    const ipfsBaseJsonURI = `https://ipfs.io/ipfs/${response.data.IpfsHash}` as string;

    // **** Now go and update the storage variable
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
