import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockPenguin } from "../../mocks/penguins";
import Navbar from "./Navbar";

const mockUAppDispatch = jest.fn();

jest.mock("../../app/redux/hooks/hooks", () => ({
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

describe("Given a Navbar component", () => {
  describe("When it's invoked with headerTitle Detail", () => {
    test("Then it should render a nav with title Detail", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
          </Provider>
        </BrowserRouter>
      );

      const title = screen.getByText("Detail");
      expect(title).toBeInTheDocument();
    });
  });

  describe("When search button is clicked", () => {
    test("Then handleSearchSubmitCall is called", () => {
      const handleSearchSubmitCall = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={false} />
          </Provider>
        </BrowserRouter>
      );

      const btSearch = screen.getByTitle("bt-search-submit");
      expect(btSearch).toBeInTheDocument();

      userEvent.click(btSearch);

      handleSearchSubmitCall();
      expect(handleSearchSubmitCall).toHaveBeenCalled();
    });
  });

  describe("When search input change", () => {
    test("Then handleSearchChange is called", () => {
      const handleSearchChange = jest.fn();
      const searchPlaceHolderText = "Search by name/category/description...";
      const handleDimmer = jest.fn();

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Navbar headerTitle="Detail" isMenuOpen={false} isDesktop={true} />
          </Provider>
        </BrowserRouter>
      );

      const inputSearch = screen.getByPlaceholderText(searchPlaceHolderText);

      expect(inputSearch).toBeInTheDocument();

      userEvent.type(inputSearch, "test");

      handleSearchChange();
      expect(handleSearchChange).toHaveBeenCalled();

      const dimmer = screen.getByRole("tabpanel");

      expect(dimmer).toBeInTheDocument();

      userEvent.click(dimmer);

      handleDimmer();
      expect(handleDimmer).toHaveBeenCalled();
    });
  });
});
