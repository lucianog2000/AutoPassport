import firebase from '../../config/firebase'
export async function getAllFuels() {
  const querySnapshot = await firebase.db.collection("fuelTypes")
    .get()
  return querySnapshot.docs
}
export async function updateFuel(id, body) {
  const querySnapshot = await firebase.db.doc("fuelTypes/" + id).set(body)
  return querySnapshot
}
export async function deleteFuel(id) {
  const querySnapshot = await firebase.db.doc("fuelTypes/" + id).delete()
  return querySnapshot
}
