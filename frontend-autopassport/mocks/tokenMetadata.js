import { faker } from '@faker-js/faker';
export function tokenMetadata() {
  const randomBrand = faker.vehicle.manufacturer();
  const randomModel = faker.vehicle.model();
  const randomVIN = faker.vehicle.vin();
  return ({
    "tokenId": '',
    "brand": `${randomBrand}`,
    "model": `${randomModel}`,
    "vin": `${randomVIN}`,
    "color_code": "070",
    "year": 2022,
    "mileage": 5000,
    "image": "https://gateway.pinata.cloud/ipfs/QmcR6pJ4wMbp1JvSAWfDgkE8cehh9vZQkj7Vthe9sMEwFH?filename=car.png",
    "status": "Good",
    "repair_history": [
      {
        "date": "2022-03-15",
        "repair": "Oil change",
        "parts": ["Oil filter", "Synthetic oil"]
      },
      {
        "date": "2022-05-10",
        "repair": "Brake replacement",
        "parts": ["Brake pads", "Brake discs"]
      }
    ],
    "maintenance_history": [
      {
        "date": "2022-01-20",
        "maintenance": "Tire replacement",
        "parts": ["Michelin tires"]
      },
      {
        "date": "2022-04-30",
        "maintenance": "Wheel alignment and balancing",
        "parts": []
      }
    ],
    "current_owner": "0x48d113853023Ca865d9bc0Df8Df5d27de3AfB811",
    "previous_owners": ["0x48d113853023Ca865d9bc0Df8Df5d27de3Af4321", "0x92d113853023Ca865d9bc0Df8Df5d27de3AfB576"],
    "last_update": "2023-05-10"
  })
}