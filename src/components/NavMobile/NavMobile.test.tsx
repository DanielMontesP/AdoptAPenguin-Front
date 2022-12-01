import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NavMobile from "./NavMobile";
import store from "../../app/redux/store/store";
import userEvent from "@testing-library/user-event";

describe("Given a NavMobile component", () => {
  describe("When click AddFav", () => {
    test("Then AddFav have to been called", () => {
      const stringToFind = "Home";
      const labelAddFav = "bt-favs";

      const addFav = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Home" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(2);

      const buttonAddFav = screen.getByTitle(labelAddFav);
      userEvent.click(buttonAddFav);

      addFav();
      expect(addFav).toHaveBeenCalled();
    });
  });
});

describe("Given a NavMobile and headerTitle New component", () => {
  describe("When headerTitle is New...", () => {
    test("Then AdoptApenguin.com have to been in the document", () => {
      const stringToFind = "Home";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="New..." />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);
    });
  });
});

describe("Given a NavWellcome with headerTitle  Likes", () => {
  describe("When rendered", () => {
    test("Then AdoptApenguin.com have to been in the document", () => {
      const stringToFind = "Home";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Likes" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);
    });
  });
});

describe("Given a NavWellcome with headerTitle Favorites", () => {
  describe("When rendered", () => {
    test("Then AdoptApenguin.com have to been in the document", () => {
      const stringToFind = "Home";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Favorites" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);
    });
  });
});

describe("Given a handleMenu button NavMobile component", () => {
  describe("When click handleMenu", () => {
    test("Then AddFav have to been called", () => {
      const stringToFind = "Likes";
      const labelAddFav = "btn-back";

      const handleBack = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Favorites" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);

      const buttonAddFav = screen.getByTitle(labelAddFav);
      userEvent.click(buttonAddFav);

      handleBack();
      expect(handleBack).toHaveBeenCalled();
    });
  });
});

describe("Given a handleLogoutCall button NavMobile component", () => {
  describe("When click handleMenu", () => {
    test("Then AddFav have to been called", () => {
      const stringToFind = "Home";

      const labelHome = "bt-home";
      const labelFavs = "bt-favs";
      const labelLikes = "bt-likes";

      const loadHomeCall = jest.fn();
      const loadLikesCall = jest.fn();
      const loadFavsCall = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Likes" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);

      const button6 = screen.getByTitle(labelHome);
      userEvent.click(button6);

      loadHomeCall();
      expect(loadHomeCall).toHaveBeenCalled();

      const button7 = screen.getByTitle(labelFavs);
      userEvent.click(button7);

      loadFavsCall();
      expect(loadFavsCall).toHaveBeenCalled();

      const button8 = screen.getByTitle(labelLikes);
      userEvent.click(button8);

      loadLikesCall();
      expect(loadLikesCall).toHaveBeenCalled();
    });
  });
});

describe("Given a handleBack button NavDesktop component", () => {
  describe("When click handleBack", () => {
    test("Then AddFav have to been called", () => {
      const stringToFind = "Home";
      const labelBack = "btn-back";

      const handleBack = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Likes" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);

      const buttonAddFav = screen.getByTitle(labelBack);
      userEvent.click(buttonAddFav);

      handleBack();
      expect(handleBack).toHaveBeenCalled();
    });
  });

  describe("When click btn-back and title Detail", () => {
    test("Then handleBack have to been called", () => {
      const stringToFind = "Detail";
      const labelAddFav = "btn-back";

      const handleBack = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Detail" />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);

      const buttonAddFav = screen.getByTitle(labelAddFav);
      userEvent.click(buttonAddFav);

      handleBack();
      expect(handleBack).toHaveBeenCalled();
    });
  });
  describe("When click btn-back and title DeEdit..ail", () => {
    test("Then handleBack have to been called", () => {
      const stringToFind = "Edit...";
      const labelAddFav = "btn-back";

      const handleBack = jest.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Edit..." />
          </BrowserRouter>
        </Provider>
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);

      const buttonAddFav = screen.getByTitle(labelAddFav);
      userEvent.click(buttonAddFav);

      handleBack();
      expect(handleBack).toHaveBeenCalled();
    });
  });
});
