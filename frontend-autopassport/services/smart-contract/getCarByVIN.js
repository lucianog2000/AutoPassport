export async function getCarByVIN(contract, vin) {
    // const transaction = await contract.getCarByVIN(vin);
    await contract.checkFines(vin);
    const transaction = await contract.getObjCarByVIN(vin);
    // const transaction = await contract.getCarAndCheckFines(vin);
    return transaction;
}