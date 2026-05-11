import { vi } from "vitest";
import { render } from "@testing-library/react";

import CheckInSecurity from "./CheckInSecurity";

const mockUseNavigate = vi.fn();
const mockUAppDispatch = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

let mockLogged = true;

vi.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({ logged: mockLogged, id: "id" }),
  useAppDispatch: () => mockUAppDispatch,
}));

describe("Given an CheckInSecurity and logged function", (): void => {
  describe("When it's invoked", (): void => {
    test("Then it should navigate to the home when the user is logged", (): void => {
      render(
        <CheckInSecurity>
          <h1>Penguins</h1>
        </CheckInSecurity>,
      );

      expect(mockUseNavigate).not.toHaveBeenCalledWith("/penguins");
    });
  });
});

describe("Given an CheckOutSecurity and not logged function", (): void => {
  describe("When it's invoked", (): void => {
    test("Then it should navigate to the home when the user is not logged", (): void => {
      mockLogged = false;
      const navigate = vi.fn();

      vi.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () => ({ logged: mockLogged, id: "id" }),
        useAppDispatch: () => mockUAppDispatch,
      }));

      render(
        <CheckInSecurity>
          <h1>Penguins</h1>
        </CheckInSecurity>,
      );

      expect(navigate).not.toHaveBeenCalled();
    });
  });
});
