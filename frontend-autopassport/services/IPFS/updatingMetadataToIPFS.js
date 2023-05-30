// import axios from 'axios';

// export const updatingMetadataToIPFS = async (metadataCID, metadataUpdated, PINATA_JWT) => {
//     const data = JSON.stringify({
//         "ipfsPinHash": metadataCID,
//         "name": "tokenMetadata",
//         "keyvalues": metadataUpdated
//       });
//     try {
//       const config = {
//           method: 'put',
//           url: `https://api.pinata.cloud/pinning/${metadataCID}`,
//           headers: { 
//             'Authorization': PINATA_JWT, 
//             'Content-Type': 'application/json'
//           },
//           data: data
//         };

//       const res = await axios(config);
//       console.log('IPFS nft metadata updated succesfully');
//     } catch (error) {
//       console.log('Error updating IPFS nft metadata: ', error);
//     }
//   }

import axios from 'axios';

const API_Key = 'ecd2ec3fac61716e9912'
const API_Secret = '6640b3c07760e9e2309a0d5ae002dc361aafd376c92940721dd80680a71c93ec'

export const updatingMetadataToIPFS = async (metadataCID, metadataUpdated, PINATA_JWT) => {
  var data = JSON.stringify({
    "ipfsPinHash": metadataCID,
    "name": "Prueba",
    "keyvalues": {
      "updated2": JSON.stringify(metadataUpdated)
    }
  });

  console.log('data to update: ', data)
  var config = {
    method: 'put',
    url: `https://api.pinata.cloud/pinning/hashMetadata/`,
    headers: {
      'Authorization': PINATA_JWT,
      'Content-Type': 'application/json',
      pinata_api_key: API_Key,
      pinata_secret_api_key: API_Secret,
    },
    data: data
  };

  try {
    const res = await axios(config);
    console.log('IPFS nft metadata updated succesfully');
    return res;
  } catch (error) {
    console.log('Error updating IPFS nft metadata: ', error);
  }
}