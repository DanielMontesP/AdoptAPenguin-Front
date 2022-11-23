import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockPenguin } from "../../mocks/penguins";
import EditButtons from "./EditButtons";

describe("When handleEdit clicked and is already fav", () => {
  describe("When edit action is called", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-edit";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <EditButtons penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const handleEdit = jest.fn().mockReturnValue(true);
      const label = screen.getByTitle(labelToFind);

      userEvent.click(label);
      handleEdit();

      expect(handleEdit).toHaveBeenCalled();
    });
  });
  describe("When handleDelete action is called", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-edit";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <EditButtons penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const handleDelete = jest.fn().mockReturnValue(true);
      const label = screen.getByTitle(labelToFind);

      userEvent.click(label);
      handleDelete();

      expect(handleDelete).toHaveBeenCalled();
    });
  });
});
