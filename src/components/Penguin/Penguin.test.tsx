import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { mockPenguins } from "../../mocks/penguins";

import store from "../../app/redux/store/store";
import Penguin from "./Penguin";
import userEvent from "@testing-library/user-event";
import { use } from "react";

const mockDispatch = vi.fn();

vi.mock("../../app/redux/hooks/hooks", () => ({
  ...vi.importActual("../../app/redux/hooks/hooks"),
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({
    isMenuOpen: true,
    headerTitle: "test",
    user: { id: "id" },
  }),
}));

describe("Given the Penguin component", () => {
  describe("When it's invoked", () => {
    test("Then it should render one heading element", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Penguin penguin={mockPenguins[0]} />
          </BrowserRouter>
        </Provider>,
      );

      const result = screen.getAllByText("Penguin1");

      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("when its clicked the button", () => {
    test("then it should call dispatch", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Penguin penguin={mockPenguins[0]} />
          </BrowserRouter>
        </Provider>,
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(2);
    });
  });
  describe("When handleMoreDetail clicked", () => {
    test("then it should call dispatch", () => {
      const labelToFind = "bt-more-detail";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Penguin penguin={mockPenguins[0]} />
          </BrowserRouter>
        </Provider>,
      );

      const handleMoreDetail = vi.fn().mockReturnValue(true);
      const label = screen.getByTitle(labelToFind);
      userEvent.click(label);

      handleMoreDetail();

      expect(handleMoreDetail).toHaveBeenCalled();
    });
  });
});
