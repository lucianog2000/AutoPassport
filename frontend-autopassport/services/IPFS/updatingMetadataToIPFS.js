import axios from 'axios';

export const updatingMetadataToIPFS = async (metadataCID, metadataUpdated, PINATA_JWT) => {
    const data = JSON.stringify({
        "ipfsPinHash": metadataCID,
        "name": "tokenMetadata",
        "keyvalues": metadataUpdated
      });
    try {
      const config = {
          method: 'put',
          url: `https://api.pinata.cloud/pinning/${metadataCID}`,
          headers: { 
            'Authorization': PINATA_JWT, 
            'Content-Type': 'application/json'
          },
          data: data
        };
        
      const res = await axios(config);
      console.log('IPFS nft metadata updated succesfully');
    } catch (error) {
      console.log('Error updating IPFS nft metadata: ', error);
    }
  }