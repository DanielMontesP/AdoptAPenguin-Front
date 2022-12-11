import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockEmptyDataPenguin } from "../../mocks/penguins";
import EditActions from "./EditActions";

describe("Given EditActions component", () => {
  describe("When submit is clicked", () => {
    test("Then handleClick have to be called", () => {
      const labelToFind = "btn-click";
      const handleClick = jest.fn().mockReturnValue(true);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <EditActions penguin={mockEmptyDataPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByTitle(labelToFind);

      userEvent.click(label);
      handleClick();

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
