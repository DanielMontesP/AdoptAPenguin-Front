import { vi } from "vitest";
import axios from "axios";
import { mockPenguins, mockPenguinsEmpty } from "../../../../mocks/penguins";
import { loadPenguinsActionCreator } from "../../features/penguinSlice/penguinSlice";
import { render } from "@testing-library/react";
import {
  createFavThunk,
  deletePenguinThunk,
  editPenguinThunk,
  getPenguinThunk,
  loadFavsThunk,
  loadLikesThunk,
  loadPenguinsThunk,
  resetPenguinsThunk,
  resetPenguinThunk,
  searchPenguinThunk,
} from "./penguinThunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store/store";
import { mockPenguin } from "../../../../mocks/penguins";
import Home from "../../../../components/Home/Home";
import { newPenguinFormData } from "../../initializers/iniPenguins";

vi.mock("jwt-decode", () => () => ({
  username: "user1",
  id: "idUser",
  image: "image.jpg",
}));

vi.mock("../../hooks/hooks", () => ({
  useAppSelector: () => ({
    connected: true,
    headerTitle: "Favorites",
  }),
  useAppDispatch: () => vi.fn(),
}));

describe("Given the loadPenguinsThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { mockPenguin },
        status: 200,
      });

      const thunk = loadPenguinsThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given the loadFavsThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();
      loadPenguinsActionCreator(mockPenguins);
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { penguins: [] },
        status: 200,
      });

      const thunk = loadFavsThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe("When it's called with empty array", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();
      loadFavsThunk();
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { penguins: mockPenguinsEmpty },
        status: 200,
      });

      const thunk = loadFavsThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe("When loadLikesThunk is called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();
      loadPenguinsActionCreator(mockPenguins);
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { penguins: [{ likers: "idmocked" }] },
        status: 200,
      });

      const thunk = loadLikesThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe("When loadLikesThunk with no results called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();
      loadPenguinsActionCreator(mockPenguins);
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { penguins: [] },
        status: 200,
      });

      const thunk = loadLikesThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
  describe("When loadLikesThunk with 0 is called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();
      loadPenguinsActionCreator(mockPenguinsEmpty);
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { penguins: mockPenguinsEmpty },
        status: 200,
      });

      const thunk = loadLikesThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given createFavThunk", (): void => {
  describe("when it's called", (): void => {
    test("Then it should call the dispatch function", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.post = vi.fn().mockResolvedValue({
        data: { penguin: newPenguinFormData(mockPenguin.id) },
        status: 200,
      });
      const thunk = createFavThunk({ mockPenguin });
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
  describe("when it's called with no token data", (): void => {
    test("Then it should call the dispatch function", async (): void => {
      const dispatch = vi.fn();
      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.post = vi.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });
      const thunk = createFavThunk({ mockPenguin });
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given the getPenguinThunk function", (): void => {
  describe("When it's called with an user", (): void => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({ data: { penguin: mockPenguin } });

      const thunk = getPenguinThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given the resetPenguinsThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      const thunk = resetPenguinsThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the resetPenguinThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = vi.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      const thunk = resetPenguinThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the editPenguinThunk function", (): void => {
  describe("When it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.put = vi.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      document.location = vi.fn().mockReturnValue({ href: "likes" }).toString();

      const thunk = editPenguinThunk(mockPenguin, mockPenguin.id, "update");
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When editPenguinThunk with likes it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.put = vi.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      document.location = vi.fn().mockReturnValue({ href: "likes" }).toString();

      const thunk = editPenguinThunk(mockPenguin, mockPenguin.id, "likes");
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When editPenguinThunk with favs it's called", (): void => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.put = vi.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      document.location = vi.fn().mockReturnValue({ href: "favs" }).toString();

      const thunk = editPenguinThunk(mockPenguin, mockPenguin.id, "favs");
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe("When delete is called", (): void => {
    test("Then it should call dispatch", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.delete = vi.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      const thunk = deletePenguinThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
  describe("When search is called", (): void => {
    test("Then it should call dispatch", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.get = vi.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      const thunk = searchPenguinThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When search error is called", (): void => {
    test("Then it should call dispatch", async (): void => {
      const dispatch = vi.fn();

      vi.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.get = vi.fn().mockRejectedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      const thunk = searchPenguinThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("Given the loadFavsThunk function", (): void => {
    describe("When it's called", (): void => {
      test("Then it should call dispatch with the load penguins action with penguins received from axios request", (): void => {
        const dispatch = vi.fn();
        const handleLoads = vi.fn();

        render(
          <Provider store={store}>
            <BrowserRouter>
              <Home></Home>
            </BrowserRouter>
          </Provider>,
        );
        handleLoads();

        expect(dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
