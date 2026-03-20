// firebase uygulamasını başlatma fonksiyon
import { initializeApp } from "firebase/app";

//extra importlar
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// firebase konsol api key bilgileri

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "twitter-app-a9397.firebaseapp.com",
  projectId: "twitter-app-a9397",
  storageBucket: "twitter-app-a9397.firebasestorage.app",
  messagingSenderId: "547666618429",
  appId: "1:547666618429:web:57d829d3d31156595d2254",
};

// Initialize Firebase firebase kurulum fonksiyonu
const app = initializeApp(firebaseConfig);

//auth servisinin referansını al
export const auth = getAuth(app);

// google sağlayıcısının kurulum
export const googleProvider = new GoogleAuthProvider();

// firestore servisinin referansını al

export const db = getFirestore(app);

//storage servisinin referansını al
export const storage = getStorage(app);
