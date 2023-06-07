import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCuQuOIQu6PMRjAuGUmOAnU-4W40vR6ymk",
  authDomain: "autopassport-chl.firebaseapp.com",
  projectId: "autopassport-chl",
  storageBucket: "autopassport-chl.appspot.com",
  messagingSenderId: "514846752910",
  appId: "1:514846752910:web:f9ddc6aae8eb196bfe09df"
};

firebase.initializeApp(firebaseConfig)
// firebase.auth = firebase.auth()
firebase.db = firebase.firestore()
export default firebase