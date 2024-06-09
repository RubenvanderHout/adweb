import { initializeApp } from "firebase/app"

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyBppcT73hLh4V59Z9BCPic-aCFT4p-9-B8",
        authDomain: "adweb-81f6e.firebaseapp.com",
        projectId: "adweb-81f6e",
        storageBucket: "adweb-81f6e.appspot.com",
        messagingSenderId: "1099118785515",
        appId: "1:1099118785515:web:8d6c0845d9601711bf9fae",
        measurementId: "G-42DS46DNH3",
      }
}

export const app = initializeApp(environment.firebaseConfig);
