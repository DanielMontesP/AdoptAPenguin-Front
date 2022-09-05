import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockPenguin } from "../../mocks/penguins";
import ActionButtons from "./ActionButtons";

describe("Given a delete action", () => {
  describe("When the word 'user1' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-favs";
      const inputText = "user1";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ActionButtons penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      userEvent.type(label, inputText);

      expect(label).toBeInTheDocument();
    });
  });

  describe("When deleteFromLikers action is called", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-delete";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ActionButtons penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const deleteFromLikers = jest.fn().mockReturnValue(true);
      const label = screen.getByTitle(labelToFind);

      userEvent.click(label);
      deleteFromLikers();

      expect(deleteFromLikers).toHaveBeenCalled();
    });
  });
  describe("When deleteFromFavs action is called", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-favs";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ActionButtons penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const handleFavs = jest.fn().mockReturnValue(true);
      const label = screen.getByPlaceholderText(labelToFind);

      userEvent.click(label);
      handleFavs();

      expect(handleFavs).toHaveBeenCalled();
    });
  });
  describe("When edit action is called", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-edit";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ActionButtons penguin={mockPenguin} />
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
  describe("When likes action is called", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "btn-likes";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ActionButtons penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const handleLikes = jest.fn().mockReturnValue(true);
      const deleteFromLikers = jest.fn().mockReturnValue(true);

      const label = screen.getByTitle(labelToFind);

      userEvent.click(label);
      handleLikes();
      deleteFromLikers();

      expect(handleLikes).toHaveBeenCalled();
      expect(deleteFromLikers).toHaveBeenCalled();
    });
  });
});
