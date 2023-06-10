export async function getCarByVIN(contract, vin) {
    try {
        const transaction = await contract.getObjCarByVIN(vin);
        return transaction;
    } catch (error) {
        console.log(error);
    }
}