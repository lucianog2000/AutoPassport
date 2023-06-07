export async function updateAutoPassport(contract, data) {
    let { vin, mileage, newRepair, newMaintenance, newURI, last_update } = data;

    function process(repairOrMaintenance) {
        return (typeof repairOrMaintenance !== 'undefined' && repairOrMaintenance !== "") ? JSON.stringify(repairOrMaintenance).replace(/"/g, '\\"') : "";
    }
    newRepair = process(newRepair);
    newMaintenance = process(newMaintenance);  
    
    const transaction = await contract.updateAutoPassport(
        vin,
        mileage,
        newRepair,
        newMaintenance,
        newURI,
        last_update
    );
    const receipt = await transaction.wait();
    const transactionHash = receipt.transactionHash;
    return transactionHash;
}