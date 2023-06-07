export async function getCarByVIN(contract, vin) {
    // const transaction = await contract.getCarByVIN(vin);
    const transaction = await contract.getObjCarByVIN(vin);
    return transaction;
}