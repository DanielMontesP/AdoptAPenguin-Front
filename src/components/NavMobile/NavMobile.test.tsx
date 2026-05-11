import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NavMobile from "./NavMobile";
import store from "../../app/redux/store/store";
import userEvent from "@testing-library/user-event";

describe("Given a NavMobile component", (): void => {
  describe("When click AddFav", (): void => {
    test("Then AddFav have to been called", (): void => {
      const stringToFind = "Home";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Home" />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);
    });
  });
});

describe("Given a NavMobile and headerTitle New component", (): void => {
  describe("When headerTitle is New...", (): void => {
    test("Then AdoptApenguin.com have to been in the document", (): void => {
      const stringToFind = "New...";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="New..." />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);
    });
  });
});

describe("Given a NavWellcome with headerTitle  Likes", (): void => {
  describe("When rendered", (): void => {
    test("Then AdoptApenguin.com have to been in the document", (): void => {
      const stringToFind = "Likes";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Likes" />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);
    });
  });
});

describe("Given a NavWellcome with headerTitle Favorites", (): void => {
  describe("When rendered", (): void => {
    test("Then AdoptApenguin.com have to been in the document", (): void => {
      const stringToFind = "Favorites";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Favorites" />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);
    });
  });
});

describe("Given a handleBack button NavDesktop component", (): void => {
  describe("When click handleBack", (): void => {
    test("Then AddFav have to been called", (): void => {
      const stringToFind = "Likes";
      const labelBack = "btn-back";

      const handleBack = vi.fn();
      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Likes" />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);

      const buttonAddFav = screen.getByTitle(labelBack);
      userEvent.click(buttonAddFav);

      handleBack();
      expect(handleBack).toHaveBeenCalled();
    });
  });

  describe("When click btn-back and title Detail", (): void => {
    test("Then handleBack have to been called", (): void => {
      const stringToFind = "Detail";
      const labelAddFav = "btn-back";

      const handleBack = vi.fn();

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Detail" />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);

      const buttonAddFav = screen.getByTitle(labelAddFav);
      userEvent.click(buttonAddFav);

      handleBack();
      expect(handleBack).toHaveBeenCalled();
    });
  });
  describe("When click btn-back and title Edit..", (): void => {
    test("Then handleBack have to been called", (): void => {
      const stringToFind = "Edit...";
      const labelAddFav = "btn-back";

      const handleBack = vi.fn();
      const handleScroll = vi.fn();

      vi.mock("../../app/redux/hooks/hooks", () => ({
        useAppSelector: () => ({
          headerLastTitle: "Favorites",
        }),
        useAppDispatch: () => vi.fn(),
      }));

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavMobile headerTitle="Edit..." />
          </BrowserRouter>
        </Provider>,
      );

      const label = screen.getAllByText(stringToFind);
      expect(label.length).toBe(1);

      const buttonAddFav = screen.getByTitle(labelAddFav);
      userEvent.click(buttonAddFav);

      handleBack();
      handleScroll();
      expect(handleBack).toHaveBeenCalled();
    });
  });
});
