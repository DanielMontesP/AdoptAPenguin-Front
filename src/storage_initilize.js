import { initializeApp } from "firebase/app";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { correctAction } from "./components/Modals/Modals";

export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyArGWpvfmz5jBpnuRqM3hvCQr_r0fDhx9Y",
    authDomain: "adoptaunpinguino-69dcf.firebaseapp.com",
    projectId: "adoptaunpinguino-69dcf",
    storageBucket: "adoptaunpinguino-69dcf.appspot.com",
    messagingSenderId: "715282969976",
    appId: "1:715282969976:web:9cbcd8c736529293f3848d",
  };
  const firebaseApp = initializeApp(firebaseConfig);
  getStorage(firebaseApp); //eslint-disable-line no-unused-vars
};

// Get a reference to the storage service, which is used to create references in your storage bucket

export const deleteFromFirebase = (path) => {
  const storage = getStorage();

  // Create a reference to the file to delete "images/desert.jpg"
  const desertRef = ref(storage, path);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      correctAction("Image deleted succefully");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};
