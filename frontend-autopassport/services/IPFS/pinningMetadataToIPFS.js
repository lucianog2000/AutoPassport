import axios from 'axios';

export const pinningMetadataToIPFS = async (formValues, PINATA_JWT) => {
  let metadataCID;
  const { brand, model, image, vehicleIdentificationNumber, colorCode, typeOfFuel, dateOfManufacture, warrantyExpirationDate, walletAddress } = formValues;

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
      "attributes": setCreationAttributes(brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, warrantyExpirationDate, typeOfFuel, walletAddress)
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

function setCreationAttributes(brand, model, vehicleIdentificationNumber, colorCode, dateOfManufacture, warrantyExpirationDate, typeOfFuel, walletAddress) {
  return [
    {
      "trait_type": "Brand", 
      "value": brand
    },
    {
      "trait_type": "Model", 
      "value": model
    },
    {
      "trait_type": "VIN", 
      "value": vehicleIdentificationNumber
    },
    {
      "trait_type": "Mileage", 
      "value": 0
    },
    {
      "trait_type": "Color Code", 
      "value": colorCode
    },
    {
      "display_type": "date",
      "trait_type": "Date Of Manufacture", 
      "value": dateOfManufacture
    },
    {
      "display_type": "date",
      "trait_type": "Warranty Expiration Date", 
      "value": warrantyExpirationDate
    },
    {
      "trait_type": "Fuel type", 
      "value": typeOfFuel
    },
    {
      "trait_type": "Repair History", 
      "value": []
    },
    {
      "trait_type": "Maintenance History", 
      "value": []
    },
    {
      "trait_type": "Current Owner", 
      "value": walletAddress
    },
    {
      "trait_type": "Previous Owners", 
      "value": []
    },
    {
      "trait_type": "Last Update", 
      "value": dateOfManufacture
    },
  ];
}
// {
//   "brand": brand,
//   "model": model,
//   "vin": vehicleIdentificationNumber,
//   "mileage": 0,
//   "color-code": colorCode,
//   "date-of-manufacture": dateOfManufacture,
//   "warranty-expiration-date": warrantyExpirationDate,
//   "fuel-type": typeOfFuel,
//   "repair_history": [],
//   "maintenance_history": [],
//   "current_owner": walletAddress,
//   "previous_owners": [],
//   "last_update": dateOfManufacture
// }