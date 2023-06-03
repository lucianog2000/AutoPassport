import axios from 'axios';

export const pinningMetadataToIPFS = async (formValues, PINATA_JWT) => {
  let metadataCID;
  const { brand, model, image, vehicleIdentificationNumber, colorCode, typeOfFuel, dateOfManufacture, warrantyExpirationDate } = formValues;

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
      "attributes": {
        "brand": brand,
        "model": model,
        "vin": vehicleIdentificationNumber,
        "mileage": 0,
        "color_code": colorCode,
        "date_of_manufacture": dateOfManufacture,
        "warranty_expiration_date": warrantyExpirationDate,
        "fuel_type": typeOfFuel,
        "repair_history": [],
        "maintenance_history": [],
        "last_update": dateOfManufacture
      }
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
    
    metadataCID = res.data.IpfsHash;
  } catch (error) {
    console.log('Error fetching IPFS nft metadata: ', error);
  }
  return metadataCID;
}

