import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockPenguin } from "../../mocks/penguins";
import CreateForm from "./CreateForm";

describe("Given a CreateForm component", () => {
  describe("When the word 'user1' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelToFind = "Name";
      const inputText = "user1";
      const handleImg = jest.fn();
      const labelImgToFind = "image-input";
      const labelSubmit = "image-input";
      const handleSubmit = jest.fn();
      const processEdit = jest.fn();
      const processCreate = jest.fn();

      document.location = jest.fn().mockReturnValue("create").toString();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getByPlaceholderText(labelToFind);
      const Img = screen.getByPlaceholderText(labelImgToFind);
      const submit = screen.getByPlaceholderText(labelSubmit);

      userEvent.type(label, inputText);
      userEvent.type(Img, inputText);
      userEvent.click(submit);

      handleImg();
      handleSubmit();
      processCreate();
      processEdit(true);

      expect(label).toBeInTheDocument();
      expect(Img).toBeInTheDocument();
      expect(handleImg).toHaveBeenCalled();
      expect(handleSubmit).toHaveBeenCalled();
      expect(processCreate).toHaveBeenCalled();
      expect(processEdit).toHaveBeenCalled();
    });
  });
});
