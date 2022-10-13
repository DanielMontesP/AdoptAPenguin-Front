import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import DetailPage from "./DetailPage";

describe("Given a CreatePage component", () => {
  describe("When the word 'penguin' is written to the username input field", () => {
    test("Then the value of the username input field should be 'penguin'", () => {
      const stringToFind1 = "Messages";
      const stringToFind2 = "Description";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <DetailPage />
          </BrowserRouter>
        </Provider>
      );

      const label1 = screen.getByText(stringToFind1);
      const label2 = screen.getByText(stringToFind2);

      expect(label1).toHaveTextContent(stringToFind1);
      expect(label2).toHaveTextContent(stringToFind2);
    });
  });
});
