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

import {
  finishedLoadingActionCreator,
  loadingActionCreator,
} from "../../features/uiSlice/uiSlice";
import { blankFormData } from "../../initializers/iniPenguins";

let message = "";

export const loadPenguinsThunk = () => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const {
        data: { penguins },
      } = await axios.get(`${process.env.REACT_APP_API_URL}penguins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(loadPenguinsActionCreator(penguins));
      dispatch(finishedLoadingActionCreator());
    }
  } catch (error) {
    setLoadingOffWithMessage(`GET Favorites: ${error}`, true);
  }
};

export const loadFavsThunk = () => async (dispatch: AppDispatch) => {
  setLoadingOn(`GET Favorites: Loading data...`);

  const token = localStorage.getItem("token");

  if (token) {
    const {
      data: { penguins },
    } = await axios.get(`${process.env.REACT_APP_API_URL}penguins/favs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (penguins.length === 0) {
      setLoadingOffWithMessage("GET Favorites: No Favorites added yet", false);
    }

    dispatch(loadPenguinsActionCreator(penguins));
    dispatch(finishedLoadingActionCreator());
    setLoadingOffWithMessage("GET Favorites: Finished successfully.", false);
  }
};

export const loadLikesThunk = () => async (dispatch: AppDispatch) => {
  dispatch(loadingActionCreator());
  setLoadingOn(`GET Likes: Loading data...`);

  const token = localStorage.getItem("token");

  if (token) {
    const {
      data: { penguins },
    } = await axios.get(`${process.env.REACT_APP_API_URL}penguins/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (penguins.length === 0) {
      setLoadingOffWithMessage("GET Likes: No likes added yet", false);
    }

    dispatch(loadPenguinsActionCreator(penguins));
    dispatch(finishedLoadingActionCreator());
    setLoadingOffWithMessage("GET Likes: Finished successfully.", false);
  }
};

export const createFavThunk =
  (formPenguin: any) => async (dispatch: AppDispatch) => {
    dispatch(loadingActionCreator());
    setLoadingOn(`CREATE Favorites: Creating fav...`);

    const token = localStorage.getItem("token");
    if (token) {
      const { data: penguin } = await axios.post(
        `${process.env.REACT_APP_API_URL}penguins/create`,
        formPenguin,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "mutipart/form-data",
          },
        }
      );

      dispatch(createPenguinActionCreator(penguin));

      dispatch(loadFavsThunk());
      dispatch(finishedLoadingActionCreator());
      setLoadingOffWithMessage(
        `CREATE Fav: ${penguin.name} created successfully.`,
        false
      );
    } else {
      setLoadingOffWithMessage(
        "CREATE Favourite: Sorry, no token no cookies...",
        true
      );
    }
  };

export const getPenguinThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingActionCreator());

    if (id !== "") {
      const token = localStorage.getItem("token");

      if (token) {
        const { data: penguin } = await axios.get(
          `${process.env.REACT_APP_API_URL}penguins/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(loadPenguinActionCreator(penguin));
        dispatch(finishedLoadingActionCreator());
        setLoadingOffWithMessage(
          `GET Penguin: ${penguin.name} successfully.`,
          false
        );
      }
    }
  };

export const searchPenguinThunk =
  (search: string) => async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (search !== "" && token) {
        dispatch(loadingActionCreator());
        setLoadingOn(`SEARCH: => ${search}`);

        const { data: penguins } = await axios.get(
          `${process.env.REACT_APP_API_URL}penguins/search/${search}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(searchPenguinsActionCreator(penguins));
        dispatch(finishedLoadingActionCreator());
        setLoadingOffWithMessage(`SEARCH: ${search} finished.`, false);
      }
    } catch (err: any) {
      message = `ERROR ${err.message}`;
      dispatch(finishedLoadingActionCreator());
      setLoadingOffWithMessage(`SEARCH: ERROR: ${message}.`, false);
    }
  };

export const deletePenguinThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingActionCreator());

    setLoadingOn("DELETE FAV: Deleting...");

    const token = localStorage.getItem("token");

    const { status } = await axios.delete(
      `${process.env.REACT_APP_API_URL}penguins/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (status === 200) {
      dispatch(deletePenguinActionCreator(id));

      dispatch(finishedLoadingActionCreator());
      setLoadingOffWithMessage("DELETE Penguin: Finished successfully!", false);
    }
  };

export const editPenguinThunk =
  (formPenguin: any, type: string) => async (dispatch: AppDispatch) => {
    dispatch(loadingActionCreator());
    setLoadingOn("EDIT Penguin...");

    const token = localStorage.getItem("token");

    if (token && formPenguin.id) {
      const { data: penguin } = await axios.put(
        `${process.env.REACT_APP_API_URL}penguins/${formPenguin.id}?task=${type}`,
        formPenguin,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getPenguinThunk(formPenguin.id));
      dispatch(editPenguinActionCreator(penguin));

      dispatch(finishedLoadingActionCreator());
      setLoadingOffWithMessage(`${type}`, false);
    }
  };

export const resetPenguinThunk = () => async (dispatch: AppDispatch) => {
  dispatch(resetPenguinActionCreator(blankFormData));
  dispatch(finishedLoadingActionCreator());
};

export const resetPenguinsThunk = () => async (dispatch: AppDispatch) => {
  dispatch(resetPenguinsActionCreator(blankFormData));
  dispatch(finishedLoadingActionCreator());
};
