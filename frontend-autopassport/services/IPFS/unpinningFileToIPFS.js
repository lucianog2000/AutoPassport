import axios from 'axios';

export const unpinningFileToIPFS = async (CID, PINATA_JWT) => {
  try {
    const config = {
        method: 'delete',
        url: `https://api.pinata.cloud/pinning/unpin/${CID}`,
        headers: { 
          'Authorization': PINATA_JWT
        }
      };
      
    const res = await axios(config);
    console.log('IPFS nft image unpinned succesfully');
  } catch (error) {
    console.log('Error unpinning IPFS nft image: ', error);
  }
}
