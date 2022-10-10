import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MessageButton from "./MessageButton";
import store from "../../app/redux/store/store";
import { mockPenguin } from "../../mocks/penguins";
import userEvent from "@testing-library/user-event";

describe("Given a MessageButton component", () => {
  describe("When clicked", () => {
    test("Then handleMessage have to been called", () => {
      const stringToFind1 = "bt-message";
      const handleMessage = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <MessageButton penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const label1 = screen.getByTitle(stringToFind1);
      userEvent.click(label1);

      handleMessage();

      expect(label1).toBeInTheDocument();
      expect(handleMessage).toHaveBeenCalled();
    });
  });
});
