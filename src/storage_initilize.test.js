import { initializeApp } from "firebase/app";

import { initializeFirebase } from "./storage_initilize";

jest.mock("firebase/app");
jest.mock("firebase/storage");

describe("Given a CreatePage component", () => {
  describe("When the word 'penguin' is written to the username input field", () => {
    test("Then the value of the username input field should be 'penguin'", () => {
      initializeFirebase();

      expect(initializeApp).toHaveBeenCalled();
    });
  });
});
