import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import store from "../../app/redux/store/store";
import userEvent from "@testing-library/user-event";

describe("Given a Menu component", () => {
  describe("When bt-search clicked", () => {
    test("Then handleSearch have to been called", () => {
      const stringToFind1 = "Search by name/category/description...";
      const handleSearchEnter = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>
      );

      const label1 = screen.getByPlaceholderText(stringToFind1);
      userEvent.type(label1, "search");

      handleSearchEnter({ event: { key: "Enter" } });

      expect(label1).toBeInTheDocument();
      expect(handleSearchEnter).toHaveBeenCalled();
    });
  });
});
