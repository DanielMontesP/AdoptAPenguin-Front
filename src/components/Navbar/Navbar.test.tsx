import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockPenguin } from "../../mocks/penguins";
import Navbar from "./Navbar";

const mockUAppDispatch = vi.fn();

vi.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    logged: true,
    id: "id",
    headerLastTitle: "lastTitle",
    headerTitle: "Test",
    isModalOpen: true,
    penguin: mockPenguin.id,
    isSearchOpen: true,
  }),
  useAppDispatch: () => mockUAppDispatch,
}));

describe("Given a Navbar component", (): void => {
  describe("When it's invoked with headerTitle Detail", (): void => {
    test("Then it should render a nav with title Detail", (): void => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
          </Provider>
        </BrowserRouter>,
      );

      const title = screen.getByText("Detail");
      expect(title).toBeDefined();
    });
  });

  describe("When search button is clicked", (): void => {
    test("Then handleSearchSubmitCall is called", (): void => {
      const handleSearchSubmitCall = vi.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
          </Provider>
        </BrowserRouter>,
      );

      const btSearch = screen.getByTitle("bt-search-submit");
      expect(btSearch).toBeDefined();

      userEvent.click(btSearch);

      handleSearchSubmitCall();
      expect(handleSearchSubmitCall).toHaveBeenCalled();
    });
  });

  describe("When search input change", (): void => {
    test("Then handleSearchChange is called", (): void => {
      const handleSearchChange = vi.fn();
      const searchPlaceHolderText = "Search by name/category/description...";
      const handleDimmer = vi.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={true} />
          </Provider>
        </BrowserRouter>,
      );

      const inputSearch = screen.getByPlaceholderText(searchPlaceHolderText);

      expect(inputSearch).toBeDefined();

      userEvent.type(inputSearch, "test");

      handleSearchChange();
      expect(handleSearchChange).toHaveBeenCalled();

      const dimmer = screen.getByRole("tabpanel");

      expect(dimmer).toBeDefined();

      userEvent.click(dimmer);

      handleDimmer();
      expect(handleDimmer).toHaveBeenCalled();
    });
  });
});
