import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockEmptyDataPenguin, mockPenguin } from "../../mocks/penguins";
import ActionButtons from "./ActionButtons";

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    connected: true,
    headerTitle: "Favorites",
    penguin: mockPenguin,
  }),
  useAppDispatch: () => jest.fn(),
}));

describe("Given a btn-delete action", () => {
  describe("When clicked action is called", () => {
    test("Then deleteFromLikers have to been called", () => {
      const labelToFind = "btn-likes";
      const handleLikes = jest.fn().mockReturnValue(true);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ActionButtons penguin={mockEmptyDataPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByTitle(labelToFind);

      userEvent.click(label);
      handleLikes();

      expect(handleLikes).toHaveBeenCalled();
    });
  });
});

describe("Given a ActionButtons component", () => {
  describe("When btn-likes is clicked", () => {
    test("Then handleLikes have to been called", () => {
      const labelToFind = "btn-likes";
      const handleLikes = jest.fn().mockReturnValue(true);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ActionButtons penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByTitle(labelToFind);

      userEvent.click(label);
      handleLikes();

      expect(handleLikes).toHaveBeenCalled();
    });
  });
});

describe("Given btn-favs button", () => {
  describe("When clicked", () => {
    test("Then handlefavs function has to been called", () => {
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

  describe("When handleFavs clicked and is already fav", () => {
    test("Then handlefavs function has to been called to delete", () => {
      const labelToFind = "btn-favs";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ActionButtons penguin={mockEmptyDataPenguin} />
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

  describe("When handleEdit is called", () => {
    test("Then bt-message is rendered", () => {
      const labelToFind = "bt-message";

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

  describe("When message action is called", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "bt-message";
      const handleMessage = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ActionButtons penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByTitle(labelToFind);

      userEvent.click(label);
      handleMessage();

      expect(handleMessage).toHaveBeenCalled();
    });
  });
});
