import { vi } from "vitest";
import { render } from "@testing-library/react";

import CheckOutSecurity from "./CheckOutSecurity";

const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

let mockLogged = true;

vi.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({ logged: mockLogged, id: "id" }),
}));

describe("Given an CheckOutSecurity and logged function", (): void => {
  describe("When it's invoked", (): void => {
    test("Then it should navigate to the home when the user is logged", (): void => {
      render(
        <CheckOutSecurity>
          <h1>Penguins</h1>
        </CheckOutSecurity>,
      );

      expect(mockUseNavigate).toHaveBeenCalledWith("/penguins");
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
      }));

      render(
        <CheckOutSecurity>
          <h1>Penguins</h1>
        </CheckOutSecurity>,
      );

      expect(navigate).not.toHaveBeenCalled();
    });
  });
});
