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
import PenguinDetail from "./PenguinDetail";

describe("When bt-prev is clicked", () => {
  describe("When bt-prev is clicked", () => {
    test("getDetailPrev is called", () => {
      const ToFind = "button";
      const expectedButtons = 9;

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
});
