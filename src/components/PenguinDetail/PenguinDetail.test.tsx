import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import {
  mockPenguin,
  mockPenguins,
  mockPenguinsEmpty,
} from "../../mocks/penguins";
import ActionButtons from "../ActionButtons/ActionButtons";
import PenguinDetail from "./PenguinDetail";

describe("Given handleDelete", () => {
  describe("When clicked", () => {
    test("Then handleDelete is called", () => {
      const ToFind = "button";
      const expectedButtons = 7;
      const handleDelete = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinDetail allPenguins={mockPenguins} penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const bt = screen.getAllByRole(ToFind);
      const btDelete = screen.getByTitle("btn-delete");
      userEvent.click(btDelete);
      handleDelete();

      expect(bt.length).toBe(expectedButtons);
      expect(handleDelete).toHaveBeenCalled();
    });
  });

  describe("When bt-favs is clicked", () => {
    test("handlefavs is called", () => {
      const ToFind = "button";
      const expectedButtons = 7;

      const handleFavs = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinDetail allPenguins={mockPenguins} penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const bt = screen.getAllByRole(ToFind);
      const btFavs = screen.getByTitle("bt-likes");

      userEvent.click(btFavs);
      handleFavs();

      expect(bt.length).toBe(expectedButtons);
      expect(handleFavs).toHaveBeenCalled();
    });
  });

  describe("When bt-prev is clicked", () => {
    test("getDetailPrev is called", () => {
      const ToFind = "button";
      const expectedButtons = 7;

      const getDetailPrev = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinDetail allPenguins={mockPenguins} penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const bt = screen.getAllByRole(ToFind);
      const btToClick = screen.getByTitle("btn-prev");

      userEvent.click(btToClick);
      getDetailPrev();

      expect(bt.length).toBe(expectedButtons);
      expect(getDetailPrev).toHaveBeenCalled();
    });
  });

  describe("When bt-next is clicked", () => {
    test("getDetailNext is called", () => {
      const getDetailNext = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinDetail allPenguins={mockPenguins} penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const btToClick = screen.getByTitle("btn-next");

      userEvent.click(btToClick);
      getDetailNext();

      expect(getDetailNext).toHaveBeenCalled();
    });
  });

  describe("When bt-next is clicked and array is empty", () => {
    test("getDetailNext is called", () => {
      const getDetailNext = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinDetail
              allPenguins={mockPenguinsEmpty}
              penguin={mockPenguin}
            />
          </BrowserRouter>
        </Provider>
      );

      const btToClick = screen.getByTitle("btn-next");

      userEvent.click(btToClick);
      getDetailNext();

      expect(getDetailNext).toHaveBeenCalled();
    });
  });

  describe("When handleEdit action is called", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "bt-edit";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinDetail
              allPenguins={mockPenguinsEmpty}
              penguin={mockPenguin}
            />
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

  describe("When bt-likes is clicked to add", () => {
    test("handleLikes is called", () => {
      const handleLikes = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinDetail allPenguins={mockPenguins} penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const btToCLick = screen.getByTitle("bt-likes");

      userEvent.click(btToCLick);
      handleLikes();

      expect(handleLikes).toHaveBeenCalled();
    });
  });

  describe("When bt-likes is clicked to delete", () => {
    test("deleteLikers is called", () => {
      const deleteLikers = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinDetail allPenguins={mockPenguins} penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const btToCLick = screen.getByTitle("bt-likes");

      userEvent.click(btToCLick);
      deleteLikers();

      expect(deleteLikers).toHaveBeenCalled();
    });
  });
});
