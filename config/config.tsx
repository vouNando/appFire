
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCgOltKN-jPMHcq0V4QiL_u5V_RIHHzH70",
    authDomain: "app-1-ddf52.firebaseapp.com",
    databaseURL: "https://app-1-ddf52-default-rtdb.firebaseio.com",
    projectId: "app-1-ddf52",
    storageBucket: "app-1-ddf52.appspot.com",
    messagingSenderId: "710048876445",
    appId: "1:710048876445:web:d09122c5328b7236b99174"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getDatabase(app)