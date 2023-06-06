export async function updateAutoPassport(contract, data) {
    let { vin, mileage, repair_history, maintenance_history, newURI, last_update } = data;

    if (typeof repair_history === 'undefined' || repair_history.length === 0) {
        repair_history = ""
    }
    
    if (repair_history[0]) {
        repair_history = JSON.stringify(repair_history[0])
        console.log(repair_history);
        repair_history = repair_history.replace(/"/g, '\\"')
    } 
    
    if (typeof maintenance_history === 'undefined' || maintenance_history.length === 0) {
        maintenance_history = ""
    }
    
    if (maintenance_history[0]) {
        maintenance_history = JSON.stringify(maintenance_history[0])
        console.log(maintenance_history);
        maintenance_history = maintenance_history.replace(/"/g, '\\"')
    } 
    
    const transaction = await contract.updateAutoPassport(
        vin,
        mileage,
        repair_history,
        maintenance_history,
        newURI,
        last_update
    );
    const receipt = await transaction.wait();
    const transactionHash = receipt.transactionHash;
    return transactionHash;
}