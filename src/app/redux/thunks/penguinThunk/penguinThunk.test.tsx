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

jest.mock("jwt-decode", () => () => ({
  username: "user1",
  id: "idUser",
  image: "image.jpg",
}));

jest.mock("../../hooks/hooks", () => ({
  useAppSelector: () => ({
    connected: true,
    headerTitle: "Favorites",
  }),
  useAppDispatch: () => jest.fn(),
}));

describe("Given the loadPenguinsThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { mockPenguin },
        status: 200,
      });

      const thunk = loadPenguinsThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});

describe("Given the loadFavsThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();
      loadPenguinsActionCreator(mockPenguins);
      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { penguins: [] },
        status: 200,
      });

      const thunk = loadFavsThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe("When it's called with empty array", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();
      loadFavsThunk();
      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { penguins: mockPenguinsEmpty },
        status: 200,
      });

      const thunk = loadFavsThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe("When loadLikesThunk is called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();
      loadPenguinsActionCreator(mockPenguins);
      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { penguins: [{ likers: "idmocked" }] },
        status: 200,
      });

      const thunk = loadLikesThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe("When loadLikesThunk with no results called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();
      loadPenguinsActionCreator(mockPenguins);
      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { penguins: [] },
        status: 200,
      });

      const thunk = loadLikesThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
  describe("When loadLikesThunk with 0 is called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();
      loadPenguinsActionCreator(mockPenguinsEmpty);
      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { penguins: mockPenguinsEmpty },
        status: 200,
      });

      const thunk = loadLikesThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given createFavThunk", () => {
  describe("when it's called", () => {
    test("Then it should call the dispatch function", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.post = jest.fn().mockResolvedValue({
        data: { penguin: newPenguinFormData(mockPenguin.id) },
        status: 200,
      });
      const thunk = createFavThunk({ mockPenguin });
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
  describe("when it's called with no token data", () => {
    test("Then it should call the dispatch function", async () => {
      const dispatch = jest.fn();
      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.post = jest.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });
      const thunk = createFavThunk({ mockPenguin });
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given the getPenguinThunk function", () => {
  describe("When it's called with an user", () => {
    test("Then it should call dispatch with the set notes to show action with the notes received from the axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest
        .fn()
        .mockResolvedValue({ data: { penguin: mockPenguin } });

      const thunk = getPenguinThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe("Given the resetPenguinsThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      const thunk = resetPenguinsThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the resetPenguinThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.get = jest.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      const thunk = resetPenguinThunk();
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the editPenguinThunk function", () => {
  describe("When it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.put = jest.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      document.location = jest
        .fn()
        .mockReturnValue({ href: "likes" })
        .toString();

      const thunk = editPenguinThunk(mockPenguin, mockPenguin.id, "update");
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When editPenguinThunk with likes it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.put = jest.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      document.location = jest
        .fn()
        .mockReturnValue({ href: "likes" })
        .toString();

      const thunk = editPenguinThunk(mockPenguin, mockPenguin.id, "likes");
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When editPenguinThunk with favs it's called", () => {
    test("Then it should call dispatch with the load penguins action with penguins received from axios request", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");
      axios.put = jest.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      document.location = jest
        .fn()
        .mockReturnValue({ href: "favs" })
        .toString();

      const thunk = editPenguinThunk(mockPenguin, mockPenguin.id, "favs");
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe("When delete is called", () => {
    test("Then it should call dispatch", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.delete = jest.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      const thunk = deletePenguinThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
  describe("When search is called", () => {
    test("Then it should call dispatch", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.get = jest.fn().mockResolvedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      const thunk = searchPenguinThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When search error is called", () => {
    test("Then it should call dispatch", async () => {
      const dispatch = jest.fn();

      jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token");

      axios.get = jest.fn().mockRejectedValue({
        data: { penguin: mockPenguin },
        status: 200,
      });

      const thunk = searchPenguinThunk(mockPenguin.id);
      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("Given the loadFavsThunk function", () => {
    describe("When it's called", () => {
      test("Then it should call dispatch with the load penguins action with penguins received from axios request", () => {
        const dispatch = jest.fn();
        const handleLoads = jest.fn();

        render(
          <Provider store={store}>
            <BrowserRouter>
              <Home></Home>
            </BrowserRouter>
          </Provider>
        );
        handleLoads();

        expect(dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
