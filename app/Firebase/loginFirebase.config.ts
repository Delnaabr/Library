import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCRi3cIIekEcLsDhGaUCEfMdt3Ncf1rF7w",
  authDomain: "library-management-nextjs.firebaseapp.com",
  projectId: "library-management-nextjs",
  storageBucket: "library-management-nextjs.appspot.com",
  messagingSenderId: "999613809655",
  appId: "1:999613809655:web:32024145af52edf324a4f2",
  measurementId: "G-8HLQZD8FYR"
};

const app = initializeApp(firebaseConfig);
export const database=getAuth(app)
// const analytics = getAnalytics(app);