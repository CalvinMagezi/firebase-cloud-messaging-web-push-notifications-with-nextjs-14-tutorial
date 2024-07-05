import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5-Mt4AVColvCm57e5AVs4d2TpBsbLQtM",
  authDomain: "fcm-demo-fec06.firebaseapp.com",
  projectId: "fcm-demo-fec06",
  storageBucket: "fcm-demo-fec06.appspot.com",
  messagingSenderId: "981819859331",
  appId: "1:981819859331:web:442e049ce05a58723956b6",
  measurementId: "G-E0GXDFTTX8",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
