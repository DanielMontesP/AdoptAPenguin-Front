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

      const searchPlaceHolderText = "Search by name/category/description...";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Menu isMenuOpened={true} />
          </BrowserRouter>
        </Provider>
      );

      const label1 = screen.getByTitle("bt-search");
      const label2 = screen.getByPlaceholderText(searchPlaceHolderText);

      userEvent.type(label2, "search");

      userEvent.click(label1);

      handleSearch({
        event: { key: "Enter", currentTarget: { title: "desktop-bt-search" } },
      });
      handleSearchEnter({
        event: { key: "Enter", currentTarget: { title: "desktop-bt-search" } },
      });

      expect(label1).toBeInTheDocument();
      expect(label2).toBeInTheDocument();
      expect(handleSearchEnter).toHaveBeenCalled();
      expect(handleSearch).toHaveBeenCalled();
    });
  });
});
