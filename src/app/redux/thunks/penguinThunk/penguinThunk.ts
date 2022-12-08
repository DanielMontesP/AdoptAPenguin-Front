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
import { penguins } from "../../../../utils/data.js";
import { blankFormData } from "../../initializers/iniPenguins";
import { finishedLoadingActionCreator } from "../../features/uiSlice/uiSlice";
import {
  connectedToServer,
  handleNoConexion,
} from "../../../../components/uiHandlers/uiHandlers";
import { handleServerInfo } from "../../../../utils/utils";
import { getUserMessagesThunk } from "../userThunk/userThunk";
import { UserInfo } from "../../types/userInterfaces/userInterfaces";
import jwtDecode from "jwt-decode";

let firstLoad = true;
let textNoConnection = "";
const textFirstLoad = "Server is still loading, functionality will be disabled";
const textNextLoadsNoConnection =
  "Please try again in few seconds. Service render.com is still initializing";

if (firstLoad) {
  textNoConnection = textFirstLoad;
} else {
  textNoConnection = textNextLoadsNoConnection;
}

export const loadPenguinsThunk = () => async (dispatch: AppDispatch) => {
  try {
    // dispatch(
    //   serverLoadingActionCreator({
    //     loadedProcess: [
    //       {
    //         process: "loadPenguinsThunk",
    //         loading: true,
    //       },
    //     ],
    //   })
    // // );
    firstLoad = false;
    const token = localStorage.getItem("token");

    const userData: UserInfo = jwtDecode(token as string);
    const connected = connectedToServer() ? true : false;

    if (connected) {
      if (token) {
        const {
          data: { penguins },
        } = await axios.get(`${process.env.REACT_APP_API_URL}penguins`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        handleServerInfo(
          true,
          `${process.env.REACT_APP_API_URL}`,
          "Connected to server",
          dispatch
        );

        dispatch(getUserMessagesThunk(userData.id));

        dispatch(finishedLoadingActionCreator("loadingActionCreator"));
        dispatch(loadPenguinsActionCreator(penguins));

        // dispatch(
        //   serverFinishedLoadActionCreator({
        //     loadedProcess: [
        //       {
        //         process: "loadPenguinsThunk",
        //         loading: false,
        //       },
        //     ],
        //   })
        // );
      } else {
        handleNoConexion(dispatch, "user.id");
        setLoadingOffWithMessage(`GET Penguins: ${textNoConnection}`, false);
      }
    }
  } catch (error) {
    handleNoConexion(dispatch, "user.id");
    dispatch(loadPenguinsActionCreator(penguins));
    setLoadingOffWithMessage(`GET Penguins: ${textNoConnection}`, false);
  }
};

export const loadFavsThunk = () => async (dispatch: AppDispatch) => {
  try {
    setLoadingOn(`GET Favorites: Loading data...`);
    // dispatch(
    //   serverLoadingActionCreator({
    //     loadedProcess: [
    //       {
    //         process: "loadPenguinsThunk",
    //         loading: true,
    //       },
    //     ],
    //   })
    // );
    const token = localStorage.getItem("token");
    const userData: UserInfo = jwtDecode(token as string);

    const connected = connectedToServer() ? true : false;
    if (connected) {
      if (token) {
        const {
          data: { penguins },
        } = await axios.get(`${process.env.REACT_APP_API_URL}penguins/favs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (penguins.length === 0) {
          setLoadingOffWithMessage(
            "GET Favorites: No Favorites added yet",
            false
          );
        }
        handleServerInfo(
          true,
          `${process.env.REACT_APP_API_URL}`,
          "Connected to server",
          dispatch
        );
        dispatch(finishedLoadingActionCreator("loadingActionCreator"));
        dispatch(loadPenguinsActionCreator(penguins));

        dispatch(getUserMessagesThunk(userData.id));
        // dispatch(
        //   serverFinishedLoadActionCreator({
        //     loadedProcess: [
        //       {
        //         process: "loadPenguinsThunk",
        //         loading: false,
        //       },
        //     ],
        //   })
        // );
        setLoadingOffWithMessage(
          "GET Favorites: Finished successfully.",
          false
        );
      }
    } else {
      handleNoConexion(dispatch, "user.id");
      setLoadingOffWithMessage(`GET Favs: ${textNoConnection}`, false);
    }
  } catch (error) {
    dispatch(loadPenguinsActionCreator(penguins));

    handleNoConexion(dispatch, "user.id");
    handleServerInfo(false, "local", error, dispatch);

    setLoadingOffWithMessage(`GET Favs: ${textNoConnection}`, false);
  }
};

export const loadLikesThunk = () => async (dispatch: AppDispatch) => {
  try {
    setLoadingOn(`GET Likes: Loading data...`);
    // dispatch(
    //   serverLoadingActionCreator({
    //     loadedProcess: [
    //       {
    //         process: "loadLikesThunk",
    //         loading: true,
    //       },
    //     ],
    //   })
    // );

    const token = localStorage.getItem("token");

    const userData: UserInfo = jwtDecode(token as string);

    const connected = connectedToServer() ? true : false;
    if (connected) {
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
        handleServerInfo(
          true,
          `${process.env.REACT_APP_API_URL}`,
          "Connected to server",
          dispatch
        );

        dispatch(getUserMessagesThunk(userData.id));

        dispatch(finishedLoadingActionCreator("loadingActionCreator"));
        dispatch(loadPenguinsActionCreator(penguins));
        // dispatch(
        //   serverFinishedLoadActionCreator({
        //     loadedProcess: [
        //       {
        //         process: "loadLikesThunk",
        //         loading: true,
        //       },
        //     ],
        //   })
        // );
        setLoadingOffWithMessage(
          "GET Favorites: Finished successfully.",
          false
        );
      }
    } else {
      handleNoConexion(dispatch, "user.id");

      setLoadingOffWithMessage(`GET Likes: ${textNoConnection}`, false);
    }
  } catch (error) {
    handleNoConexion(dispatch, "user.id");
    dispatch(loadPenguinsActionCreator(penguins));
    handleServerInfo(false, "local", error, dispatch);

    setLoadingOffWithMessage(`GET Likes: ${textNoConnection}`, false);
  }
};

export const createFavThunk =
  (formPenguin: any) => async (dispatch: AppDispatch) => {
    try {
      // dispatch(
      //   serverLoadingActionCreator({
      //     loadedProcess: [
      //       {
      //         process: "createFavThunk",
      //         loading: true,
      //       },
      //     ],
      //   })
      // );
      setLoadingOn(`CREATE Favorites: Creating fav...`);

      const token = localStorage.getItem("token");

      const connected = connectedToServer() ? true : false;
      if (connected) {
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

          handleServerInfo(
            true,
            `${process.env.REACT_APP_API_URL}`,
            "Connected to server",
            dispatch
          );
          dispatch(createPenguinActionCreator(penguin));

          dispatch(loadFavsThunk());
          // dispatch(
          //   serverFinishedLoadActionCreator({
          //     loadedProcess: [
          //       {
          //         process: "createFavThunk",
          //         loading: false,
          //       },
          //     ],
          //   })
          // );
          setLoadingOffWithMessage(
            `CREATE Fav: ${penguin.name} created successfully.`,
            false
          );
        }
      } else {
        handleNoConexion(dispatch, "user.id");
        setLoadingOffWithMessage(
          `CREATE Favourite: ${textNoConnection}`,
          false
        );
      }
    } catch (error) {
      handleNoConexion(dispatch, "user.id");
      dispatch(loadPenguinsActionCreator(penguins));
      setLoadingOffWithMessage(`CREATE Favourite: ${textNoConnection}`, false);
    }
  };

export const getPenguinThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      // dispatch(
      //   serverLoadingActionCreator({
      //     loadedProcess: [
      //       {
      //         process: "getPenguinThunk",
      //         loading: true,
      //       },
      //     ],
      //   })
      // );
      if (id !== "") {
        const token = localStorage.getItem("token");

        const connected = connectedToServer() ? true : false;
        if (connected) {
          if (token) {
            const { data: penguin } = await axios.get(
              `${process.env.REACT_APP_API_URL}penguins/${id}`,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            handleServerInfo(
              true,
              `${process.env.REACT_APP_API_URL}`,
              "Connected to server",
              dispatch
            );

            dispatch(loadPenguinActionCreator(penguin));
            // dispatch(
            //   serverFinishedLoadActionCreator({
            //     loadedProcess: [
            //       {
            //         process: "getPenguinThunk",
            //         loading: false,
            //       },
            //     ],
            //   })
            // );
            setLoadingOffWithMessage(
              `GET Penguin: ${penguin.name} successfully.`,
              false
            );
          } else {
            handleNoConexion(dispatch, "user.id");
            setLoadingOffWithMessage(`GET Penguin: ${textNoConnection}`, false);
          }
        }
      }
    } catch (error) {
      handleNoConexion(dispatch, "user.id");
      dispatch(loadPenguinsActionCreator(penguins));
      setLoadingOffWithMessage(`GET Penguin: ${textNoConnection}`, false);
    }
  };

export const searchPenguinThunk =
  (search: string) => async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");

      const connected = connectedToServer() ? true : false;
      if (connected) {
        if (search !== "" && token) {
          // dispatch(
          //   serverLoadingActionCreator({
          //     loadedProcess: [
          //       {
          //         process: "searchPenguinThunk",
          //         loading: true,
          //       },
          //     ],
          //   })
          // );
          setLoadingOn(`SEARCH: => ${search}`);

          const { data: penguins } = await axios.get(
            `${process.env.REACT_APP_API_URL}penguins/search/${search}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          handleServerInfo(
            true,
            `${process.env.REACT_APP_API_URL}`,
            "Connected to server",
            dispatch
          );
          dispatch(searchPenguinsActionCreator(penguins));
          // dispatch(
          //   serverFinishedLoadActionCreator({
          //     loadedProcess: [
          //       {
          //         process: "searchPenguinThunk",
          //         loading: false,
          //       },
          //     ],
          //   })
          // );
          setLoadingOffWithMessage(`SEARCH: ${search} finished.`, false);
        }
      } else {
        handleNoConexion(dispatch, "user.id");
        setLoadingOffWithMessage(`SEARCH Penguin: ${textNoConnection}`, false);
      }
    } catch (error: any) {
      handleNoConexion(dispatch, "user.id");
      dispatch(loadPenguinsActionCreator(penguins));
      setLoadingOffWithMessage(`GET Penguin: ${textNoConnection}`, false);
    }
  };

export const deletePenguinThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      // dispatch(
      //   serverLoadingActionCreator({
      //     loadedProcess: [
      //       {
      //         process: "searchPenguinThunk",
      //         loading: false,
      //       },
      //     ],
      //   })
      // );
      setLoadingOn("DELETE FAV: Deleting...");

      const token = localStorage.getItem("token");

      const connected = connectedToServer() ? true : false;
      if (connected) {
        if (token) {
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
            handleServerInfo(
              true,
              `${process.env.REACT_APP_API_URL}`,
              "Connected to server",
              dispatch
            );
            // dispatch(
            //   serverFinishedLoadActionCreator({
            //     loadedProcess: [
            //       {
            //         process: "deletePenguinThunk",
            //         loading: false,
            //       },
            //     ],
            //   })
            // );
            setLoadingOffWithMessage(
              "DELETE Penguin: Finished successfully!",
              false
            );
          }
        } else {
          handleNoConexion(dispatch, "user.id");
          setLoadingOffWithMessage(`GET Penguin: ${textNoConnection}`, false);
        }
      }
    } catch (error) {
      handleNoConexion(dispatch, "user.id");
      dispatch(loadPenguinsActionCreator(penguins));
      setLoadingOffWithMessage(`DELETE Penguin: ${textNoConnection}`, false);
    }
  };

export const editPenguinThunk =
  (formPenguin: any, type: string) => async (dispatch: AppDispatch) => {
    try {
      // dispatch(
      //   serverLoadingActionCreator({
      //     loadedProcess: [{ process: "editPenguinThunk", loading: true }],
      //   })
      // );
      setLoadingOn("EDIT Penguin...");

      const token = localStorage.getItem("token");

      const connected = connectedToServer() ? true : false;
      if (connected) {
        if (token) {
          const { data: penguin } = await axios.put(
            `${process.env.REACT_APP_API_URL}penguins/${formPenguin.id}?task=${type}`,
            formPenguin,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          handleServerInfo(
            true,
            `${process.env.REACT_APP_API_URL}`,
            "Connected to server",
            dispatch
          );
          dispatch(getPenguinThunk(formPenguin.id));
          dispatch(editPenguinActionCreator(penguin));

          // dispatch(
          //   serverFinishedLoadActionCreator({
          //     loadedProcess: [
          //       {
          //         process: "editPenguinThunk",
          //         loading: false,
          //       },
          //     ],
          //   })
          // );
          setLoadingOffWithMessage(`${type}`, false);
        }
      } else {
        handleNoConexion(dispatch, "user.id");
        setLoadingOffWithMessage(`EDIT Penguin: ${textNoConnection}`, false);
      }
    } catch (error) {
      dispatch(loadPenguinsActionCreator(penguins));
      handleNoConexion(dispatch, "user.id");

      setLoadingOffWithMessage(`EDIT Penguin:: ${textNoConnection}`, false);
    }
  };

export const resetPenguinThunk = () => async (dispatch: AppDispatch) => {
  dispatch(resetPenguinActionCreator(blankFormData));
  // dispatch(
  //   serverFinishedLoadActionCreator({
  //     loadedProcess: [
  //       {
  //         process: "resetPenguinThunk",
  //         loading: false,
  //       },
  //     ],
  //   })
  // );
};

export const resetPenguinsThunk = () => async (dispatch: AppDispatch) => {
  dispatch(resetPenguinsActionCreator(blankFormData));
  // dispatch(
  //   serverFinishedLoadActionCreator({
  //     loadedProcess: [
  //       {
  //         process: "resetPenguinsThunk",
  //         loading: false,
  //       },
  //     ],
  //   })
  // );
};
