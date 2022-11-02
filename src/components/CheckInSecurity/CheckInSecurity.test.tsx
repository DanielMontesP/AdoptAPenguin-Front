import { render } from "@testing-library/react";

import CheckInSecurity from "./CheckInSecurity";

const mockUseNavigate = jest.fn();
const mockUAppDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

let mockLogged = true;

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({ logged: mockLogged, id: "id" }),
  useAppDispatch: () => mockUAppDispatch,
}));

describe("Given an CheckInSecurity and logged function", () => {
  describe("When it's invoked", () => {
    test("Then it should navigate to the home when the user is logged", () => {
      render(
        <CheckInSecurity>
          <h1>Penguins</h1>
        </CheckInSecurity>
      );

      expect(mockUseNavigate).not.toHaveBeenCalledWith("/penguins");
    });
  });
});

describe("Given an CheckOutSecurity and not logged function", () => {
  describe("When it's invoked", () => {
    test("Then it should navigate to the home when the user is not logged", () => {
      mockLogged = false;
      const navigate = jest.fn();

      jest.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () => ({ logged: mockLogged, id: "id" }),
        useAppDispatch: () => mockUAppDispatch,
      }));

      render(
        <CheckInSecurity>
          <h1>Penguins</h1>
        </CheckInSecurity>
      );

      expect(navigate).not.toHaveBeenCalled();
    });
  });
});
