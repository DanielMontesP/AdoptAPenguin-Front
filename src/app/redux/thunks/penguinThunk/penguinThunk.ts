import axios from "axios";
import { AppDispatch } from "../../store/store";
import {
  setLoadingOffWithMessage,
  setLoadingOn,
} from "../../../../components/Modals/Modals";
import {
  createPenguinActionCreator,
  deletePenguinActionCreator,
  editPenguinActionCreator,
  loadPenguinsActionCreator,
  resetPenguinActionCreator,
  loadPenguinActionCreator,
  resetPenguinsActionCreator,
  searchPenguinsActionCreator,
} from "../../features/penguinSlice/penguinSlice";
import { penguins } from "../../../../export/penguins-export";
import { finishedLoadingActionCreator } from "../../features/uiSlice/uiSlice";
import { handleNoConexion } from "../../../../functions/uiHandlers/uiHandlers";
import { handleServerInfo } from "../../../../functions/sysHandlers/sysHandlers";
import { IPenguin } from "../../types/penguin/penguinInterfaces";

let firstLoad = false;
let textNoConnection = "";
const textFirstLoad =
  "Sorry, server is still starting. Navigation enable but data will be not editable until server is restarted";
const textNextLoadsNoConnection =
  "Please try again in few seconds. Service render.com is still initializing";

if (firstLoad) {
  textNoConnection = textFirstLoad;
} else {
  textNoConnection = textNextLoadsNoConnection;
}

export const loadPenguinsThunk = () => async (dispatch: AppDispatch) => {
  try {
    setLoadingOn(
      `Service render.com is starting...Be watter penguin...Home page will be loaded as soon as possible.`,
    );
    firstLoad = false;
    const token = localStorage.getItem("token");

    if (token) {
      const {
        data: { penguins },
      } = await axios.get(`${import.meta.env.VITE_APP_API_URL}penguins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleServerInfo(
        true,
        `${import.meta.env.VITE_APP_API_URL}penguins`,
        "Connected",
        dispatch,
      );

      setLoadingOffWithMessage(`GET Penguins: Finished successfully`, false);
      dispatch(finishedLoadingActionCreator());
      penguins && dispatch(loadPenguinsActionCreator(penguins));
    }
  } catch {
    handleNoConexion(dispatch);
    dispatch(loadPenguinsActionCreator(penguins));
    setLoadingOffWithMessage(`GET Penguins: ${textNoConnection}`, false);
  }
};

export const loadFavsThunk = () => async (dispatch: AppDispatch) => {
  try {
    setLoadingOn(`GET Favorites: Loading data...`);

    const token = localStorage.getItem("token");

    if (token) {
      const {
        data: { penguins },
      } = await axios.get(`${import.meta.env.VITE_APP_API_URL}penguins/favs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (penguins && penguins.length && penguins.length === 0) {
        setLoadingOffWithMessage(
          "GET Favorites: No Favorites added yet",
          false,
        );
      }

      dispatch(finishedLoadingActionCreator());
      penguins && dispatch(loadPenguinsActionCreator(penguins));

      setLoadingOffWithMessage("GET Favorites: Finished successfully.", false);
    }
  } catch {
    dispatch(loadPenguinsActionCreator(penguins));
    handleNoConexion(dispatch);
    handleServerInfo(false, "local", textNoConnection, dispatch);
    setLoadingOffWithMessage(`GET Favs: ${textNoConnection}`, false);
  }
};

export const loadLikesThunk = () => async (dispatch: AppDispatch) => {
  try {
    setLoadingOn(`GET Likes: Loading data...`);

    const token = localStorage.getItem("token");

    if (token) {
      const {
        data: { penguins },
      } = await axios.get(`${import.meta.env.VITE_APP_API_URL}penguins/likes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (penguins && penguins.length && penguins.length === 0) {
        setLoadingOffWithMessage("GET Likes: No likes added yet", false);
      }

      dispatch(finishedLoadingActionCreator());
      dispatch(loadPenguinsActionCreator(penguins));

      setLoadingOffWithMessage("GET Favorites: Finished successfully.", false);
    }
  } catch {
    handleNoConexion(dispatch);
    dispatch(loadPenguinsActionCreator(penguins));
    handleServerInfo(false, "local", textNoConnection, dispatch);

    setLoadingOffWithMessage(`GET Likes: ${textNoConnection}`, false);
  }
};

export const createFavThunk =
  (formPenguin: FormData) => async (dispatch: AppDispatch) => {
    try {
      setLoadingOn(`CREATE Favorites: Creating fav...`);
      const token = localStorage.getItem("token");

      if (token) {
        const { data: penguin } = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}penguins/create`,
          formPenguin,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        dispatch(createPenguinActionCreator(penguin));

        dispatch(loadFavsThunk());

        setLoadingOffWithMessage(
          `CREATE Fav: ${penguin.name} created successfully.`,
          false,
        );
      }
    } catch {
      handleNoConexion(dispatch);
      dispatch(loadPenguinsActionCreator(penguins));
      setLoadingOffWithMessage(`CREATE Favorite: ${textNoConnection} `, false);
    }
  };

export const getPenguinThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      if (id !== "") {
        const token = localStorage.getItem("token");

        if (token) {
          const { data: penguin } = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}penguins/${id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );

          dispatch(loadPenguinActionCreator(penguin));

          setLoadingOffWithMessage(
            `GET Penguin: ${penguin.name} successfully.`,
            false,
          );
        }
      }
    } catch {
      handleNoConexion(dispatch);
      dispatch(loadPenguinsActionCreator(penguins));
      setLoadingOffWithMessage(`GET Penguin: ${textNoConnection}`, false);
    }
  };

export const searchPenguinThunk =
  (search: string) => async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (search !== "" && token) {
        setLoadingOn(`SEARCH: => ${search}`);

        const { data: penguins } = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}penguins/search/${search}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );

        dispatch(searchPenguinsActionCreator(penguins));

        setLoadingOffWithMessage(`SEARCH: ${search} finished.`, false);
      }
    } catch {
      handleNoConexion(dispatch);
      dispatch(loadPenguinsActionCreator(penguins));
      setLoadingOffWithMessage(`GET Penguin: ${textNoConnection}`, false);
    }
  };

export const deletePenguinThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      setLoadingOn("DELETE FAV: Deleting...");

      const token = localStorage.getItem("token");

      if (token) {
        const { status } = await axios.delete(
          `${import.meta.env.VITE_APP_API_URL}penguins/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (status === 200) {
          dispatch(deletePenguinActionCreator(id));

          setLoadingOffWithMessage(
            "DELETE Penguin: Finished successfully!",
            false,
          );
        }
      }
    } catch {
      handleNoConexion(dispatch);
      dispatch(loadPenguinsActionCreator(penguins));
      setLoadingOffWithMessage(`DELETE Penguin: ${textNoConnection}`, false);
    }
  };

export const editPenguinThunk =
  (formPenguin: IPenguin | FormData, idPenguin: string, type: string) =>
  async (dispatch: AppDispatch) => {
    try {
      setLoadingOn("EDIT Penguin...");

      const token = localStorage.getItem("token");
      const ifIsForm =
        formPenguin instanceof FormData || formPenguin.id === ""
          ? `"Content-Type": "multipart/form-data"`
          : "";

      if (token) {
        const { data: penguin } = await axios.put(
          `${import.meta.env.VITE_APP_API_URL}penguins/${idPenguin}?task=${type}`,
          formPenguin,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              ifIsForm,
            },
          },
        );

        dispatch(getPenguinThunk(idPenguin));
        dispatch(editPenguinActionCreator(penguin));

        setLoadingOffWithMessage(`${type}`, false);
      }
    } catch {
      dispatch(loadPenguinsActionCreator(penguins));
      handleNoConexion(dispatch);

      setLoadingOffWithMessage(`EDIT Penguin:: ${textNoConnection}`, false);
    }
  };

export const resetPenguinThunk = () => async (dispatch: AppDispatch) => {
  dispatch(resetPenguinActionCreator());
};

export const resetPenguinsThunk = () => async (dispatch: AppDispatch) => {
  dispatch(resetPenguinsActionCreator());
};
