import axios from 'axios';

export const pinningMetadataToIPFS = async (tokenMetadata, PINATA_JWT) => {
  let metadataCID;

  const data = JSON.stringify({
    "pinataOptions": {
      "cidVersion": 1
    },
    "pinataMetadata": {
      "name": "tokenMetadata",
      "keyvalues": {
        "customKey": "customValue",
        "customKey2": "customValue2"
      }
    },
    "pinataContent": tokenMetadata
  });
  try {
    const config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': PINATA_JWT
      },
      data : data
    };
    const res = await axios(config);
    console.log('IPFS nft metadata load succesfully');
    
    metadataCID = res.data.IpfsHash;
  } catch (error) {
    console.log('Error fetching IPFS nft metadata: ', error);
  }
  return metadataCID;
}

