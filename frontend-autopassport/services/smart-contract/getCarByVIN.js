export async function getCarByVIN(contract, vin) {
    try {
        const transaction = await contract.getObjCarByVIN(vin);
        return transaction;
    } catch (error) {
        return error;
    }
}