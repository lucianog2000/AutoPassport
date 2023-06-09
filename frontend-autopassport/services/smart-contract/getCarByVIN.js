export async function getCarByVIN(contract, vin) {
    try {
        await contract.checkFines(vin);
        const transaction = await contract.getObjCarByVIN(vin);
        return transaction;
    } catch (error) {
        console.log(error);
    }
}