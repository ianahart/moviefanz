import firebase from 'firebase';
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRE_DATABASE_URL,
  projectId: 'moviefanz',
  appId: process.env.REACT_APP_FIRE_APP_ID,
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
