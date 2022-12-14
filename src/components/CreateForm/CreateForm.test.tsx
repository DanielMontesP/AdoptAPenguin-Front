import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../app/redux/store/store";
import { mockEmptyDataPenguin, mockPenguin } from "../../mocks/penguins";
import { mockUser } from "../../mocks/users";
import CreateForm from "./CreateForm";

let mockLogged = true;

jest.mock("../../app/redux/hooks/hooks", () => ({
  useAppSelector: () => ({
    user: {
      logged: mockLogged,
      id: mockUser.id,
    },
    headerLastTitle: "Favorites",
    headerTitle: "Favorites",
  }),
  useAppDispatch: () => jest.fn(),
}));

const processEdit = jest.fn();

describe("Given a CreateForm component", () => {
  describe("When the word 'user1' is written to the username input field", () => {
    test("Then the value of the username input field should be 'user1'", () => {
      const labelName = "Name";
      const labelCategory = "Category";
      const labelButtonSave = "bt-save";
      const inputImageToFind = "image-input";

      const handleSubmit = jest.fn();
      const handleImg = jest.fn();
      jest.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () => ({
          user: {
            logged: mockLogged,
            id: mockUser.id,
          },
          headerLastTitle: "Favorites",
          headerTitle: "New",
        }),
        useAppDispatch: () => jest.fn(),
      }));
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockEmptyDataPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const inputName = screen.getByPlaceholderText(labelName);
      const buttonSave = screen.getByPlaceholderText(labelButtonSave);
      const inputCategory = screen.getByPlaceholderText(labelCategory);
      const image = screen.getByPlaceholderText(inputImageToFind);

      userEvent.click(buttonSave);
      const fakeFile = new File(["test"], "test.png", { type: "image/png" });

      userEvent.click(image);
      userEvent.upload(image, fakeFile);
      handleImg();
      handleSubmit();
      processEdit(true);

      expect(inputName).toBeInTheDocument();
      expect(processEdit).toHaveBeenCalled();
      expect(inputCategory).toBeInTheDocument();
    });
  });

  describe("When rendered", () => {
    test("Then navigate to Favorites'", async () => {
      const textToFind = "Name";
      const placeHolderSubmit = "bt-save";
      const inputToFind = "Name";
      const inputImageToFind = "image-input";
      const inputText = "penguin1";

      const handleSubmit = jest.fn();
      const handleImg = jest.fn();

      jest.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () => ({
          user: {
            logged: mockLogged,
            id: mockUser.id,
          },
          ui: { headerLastTitle: "Home" },
          headerLastTitle: "Home",
        }),
        useAppDispatch: () => jest.fn(),
      }));

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );

      const textSubject = screen.getByPlaceholderText(textToFind);
      const btSave = screen.getByPlaceholderText(placeHolderSubmit);

      const label = screen.getByPlaceholderText(inputToFind);
      const image = screen.getByPlaceholderText(inputImageToFind);
      const fakeFile = new File(["test"], "test.png", { type: "image/png" });

      expect(textSubject).toBeInTheDocument();
      expect(btSave).toBeInTheDocument();
      expect(image).toBeInTheDocument();

      userEvent.type(label, inputText);
      userEvent.type(image, inputText);
      userEvent.upload(image, fakeFile);
      handleImg();
      userEvent.click(btSave);

      handleSubmit();
      processEdit();

      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe("When rendered and lastTitle Home", () => {
    test("Then navigate to Favorites'", async () => {
      const textToFind = "Name";
      const placeHolderSubmit = "bt-save";
      const inputToFind = "Name";
      const inputImageToFind = "image-input";
      const inputText = "penguin1";

      let mockLogged = true;

      jest.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () => ({
          logged: mockLogged,
          id: "id",
          headerLastTitle: "Home",
          headerTitle: "Favorites",
        }),
        useAppDispatch: () => jest.fn(),
      }));

      jest.mock("../../functions/sysHandlers/sysHandlers", () => ({
        resizeFile: () => jest.fn(),
      }));

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreateForm penguin={mockPenguin} />
          </BrowserRouter>
        </Provider>
      );
      const handleSubmit = jest.fn();
      const handleImg = jest.fn();
      const processCreate = jest.fn();

      const textSubject = screen.getByPlaceholderText(textToFind);
      const btSave = screen.getByPlaceholderText(placeHolderSubmit);

      const label = screen.getByPlaceholderText(inputToFind);
      const image = screen.getByPlaceholderText(inputImageToFind);
      const fakeFile = new File(["test"], "test.png", { type: "image/png" });

      expect(textSubject).toBeInTheDocument();
      expect(btSave).toBeInTheDocument();
      expect(image).toBeInTheDocument();

      userEvent.type(label, inputText);
      userEvent.type(image, inputText);
      userEvent.click(btSave);
      userEvent.upload(image, fakeFile);

      handleImg();
      handleSubmit();
      processCreate("New");

      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
