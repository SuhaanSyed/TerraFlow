import axios from 'axios';



const PINATA_API_KEY = "e0e83d8172e814adf593";
const PINATA_SECRET_API_KEY = "2244e81dd1c089afce267ff02f617d8394b81035a8ca83b15d01e9f790d79e38";

const pinJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios.post(url, JSONBody, {
        headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.error("Error pinning JSON to IPFS: ", error);
        throw error;
    });
};

const fetchFromIPFS = async (hash) => {
    const url = `https://gateway.pinata.cloud/ipfs/${hash}`;
    return axios.get(url).then(response => {
        return response.data;
    }).catch(error => {
        console.error("Error fetching data from IPFS: ", error);
        throw error;
    });
};

const listFilesFromIPFS = async () => {
    const url = `https://api.pinata.cloud/data/pinList?status=pinned`;
    return axios.get(url, {
        headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY
        }
    }).then(response => {
        return response.data.rows;
    }).catch(error => {
        console.error("Error listing files from IPFS: ", error);
        throw error;
    });
};

// Function to fetch all pinned files
const getPinnedFiles = async () => {
    try {
        const pinnedFiles = await listFilesFromIPFS();
        console.log('Pinned files:', pinnedFiles);
        return pinnedFiles;
    } catch (error) {
        console.error('Error retrieving pinned files:', error);
    }
};

export { pinJSONToIPFS, fetchFromIPFS, listFilesFromIPFS, getPinnedFiles };