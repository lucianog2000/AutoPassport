import axios from 'axios';
export const pinningMetadataToIPFS = async (formValues, PINATA_JWT) => {
  let ipfsUrl;
  const { brand, model, image, vehicleIdentificationNumber, colorCode, dateOfManufacture, warrantyExpirationDate } = formValues;

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
    "pinataContent": {
      "name": `${brand} ${model}`,
      "description": "Your AutoPassport NFT",
      "image": image,
      "brand": brand,
      "model": model,
      "vin": vehicleIdentificationNumber,
      "color-code": colorCode,
      "Date of Manufacture": dateOfManufacture,
      "warrantyExpirationDate": warrantyExpirationDate
    }
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
    const pinataUrl = 'https://gateway.pinata.cloud/ipfs/'
    ipfsUrl = pinataUrl + res.data.IpfsHash;
  } catch (error) {
    console.log('Error fetching IPFS nft metadata: ', error);
  }
  return ipfsUrl;
}