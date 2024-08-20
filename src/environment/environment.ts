import { initializeApp } from "firebase/app"

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyDdGBw40czVcMXJurt3uF9nWm9Kks5PPps",
        authDomain: "adweb-bdd0a.firebaseapp.com",
        projectId: "adweb-bdd0a",
        storageBucket: "adweb-bdd0a.appspot.com",
        messagingSenderId: "358160984476",
        appId: "1:358160984476:web:51e467bda67c5bdeaac059"
      }
}

export const app = initializeApp(environment.firebaseConfig);
