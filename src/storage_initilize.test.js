import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { initializeFirebase } from "./storage_initilize";
import { vi } from "vitest";

vi.mock("firebase/app");
vi.mock("firebase/storage");

describe("Given initializeFirebase function", () => {
  describe("When called", () => {
    test("Then it should initialize Firebase app with config", () => {
      const mockApp = {};
      initializeApp.mockReturnValue(mockApp);

      initializeFirebase();

      expect(initializeApp).toHaveBeenCalledWith({
        apiKey: "AIzaSyArGWpvfmz5jBpnuRqM3hvCQr_r0fDhx9Y",
        authDomain: "adoptaunpinguino-69dcf.firebaseapp.com",
        projectId: "adoptaunpinguino-69dcf",
        storageBucket: "adoptaunpinguino-69dcf.appspot.com",
        messagingSenderId: "715282969976",
        appId: "1:715282969976:web:9cbcd8c736529293f3848d",
      });
    });

    test("Then it should call getStorage with the app", () => {
      const mockApp = {};
      initializeApp.mockReturnValue(mockApp);

      initializeFirebase();

      expect(getStorage).toHaveBeenCalledWith(mockApp);
    });
  });
});
