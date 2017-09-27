import Firebase from 'firebase';
import config from './FirebaseConfig';

const firebaseApp = Firebase.initializeApp(config);
export default firebaseApp;
