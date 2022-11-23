import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import {
  mockMessage,
  mockMessages,
  mockMessagesEmpty,
} from "../../mocks/messages";
import {
  mockPenguin,
  mockPenguins,
  mockPenguinsEmpty,
} from "../../mocks/penguins";
import PenguinDetail from "./PenguinDetail";

let mockLogged = true;

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    logged: mockLogged,
    id: "id",
    penguins: { allPenguins: mockPenguins, penguin: mockPenguin },
    messages: { allMessages: mockMessages, message: mockMessage },
    allMessages: mockMessages,
    penguin: mockPenguin,
  }),
  useAppDispatch: () => jest.fn(),
}));

describe("When bt-prev is clicked", () => {
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
  describe("When handleTab is clicked and array is empty", () => {
    test("handleTab is called", () => {
      const handleTab = jest.fn();

      const mockResponse = jest.fn();
      Object.defineProperty(window, "location", {
        value: {
          hash: {
            endsWith: mockResponse,
            includes: mockResponse,
          },
          assign: mockResponse,
        },
        writable: true,
      });
      render(
        <Provider store={store}>
          <BrowserRouter>
            <PenguinDetail allPenguins={mockPenguins} penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const btToClick = screen.getByTitle("messages");

      userEvent.click(btToClick);
      handleTab();

      expect(handleTab).toHaveBeenCalled();

      const btToClick2 = screen.getByTitle("description");

      userEvent.click(btToClick2);
      handleTab();

      expect(handleTab).toHaveBeenCalled();
    });
  });
});
