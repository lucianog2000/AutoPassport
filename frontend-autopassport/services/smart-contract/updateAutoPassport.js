export async function updateAutoPassport(contract, data) {
    let { vin, mileage, newRepair, newMaintenance, newURI, last_update } = data;

    // if (typeof newRepair === 'undefined') {
    //     newRepair = ""
    // }
    
    // if (newRepair && newRepair !== "") {
    //     newRepair = JSON.stringify(newRepair)
    //     console.log(newRepair);
    //     newRepair = newRepair.replace(/"/g, '\\"')
    // } 
    
    // if (typeof newMaintenance === 'undefined') {
    //     newMaintenance = ""
    // }
    
    // if (newMaintenance && newMaintenance !== "") {
    //     newMaintenance = JSON.stringify(newMaintenance)
    //     console.log(newMaintenance);
    //     newMaintenance = newMaintenance.replace(/"/g, '\\"')
    // } 

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