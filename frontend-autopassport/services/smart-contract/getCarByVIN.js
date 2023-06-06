export async function getCarByVIN(contract, vin) {
    const transaction = await contract.getCarByVIN(vin);
    return transaction;
}