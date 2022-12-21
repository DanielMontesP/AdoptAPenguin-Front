import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import store from "../../app/redux/store/store";
import userEvent from "@testing-library/user-event";

describe("Given a Menu component", () => {
  describe("When bt-search clicked", () => {
    test("Then handleSearch have to been called", () => {
      const handleSearchEnter = jest.fn();
      const handleSearch = jest.fn();

      const searchPlaceHolderText = "Home";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>
      );

      const label2 = screen.getByText(searchPlaceHolderText);
      expect(label2).toBeInTheDocument();
      userEvent.type(label2, "Enter");

      handleSearch({
        event: { key: "Enter", currentTarget: { title: "desktop-bt-search" } },
      });
      handleSearchEnter({
        event: { key: "Enter", currentTarget: { title: "desktop-bt-search" } },
      });

      expect(handleSearchEnter).toHaveBeenCalled();
      expect(handleSearch).toHaveBeenCalled();
    });
  });
});
