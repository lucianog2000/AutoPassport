import firebase from '../../config/firebase'
export async function getAllFuels() {
  // return instance.get("sites/MLA/search?q=ipod")
  // return fetch("https://api.mercadolibre.com/sites/MLA/search?q="+buscar)
  // .then(res=>res.json())
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