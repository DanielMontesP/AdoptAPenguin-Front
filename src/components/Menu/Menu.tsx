import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { resetPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import noPhoto from "../../images/userPhoto.png";
import { handleFocus, toPascalCase } from "../../utils/utils";
import {
  handleLogout,
  handleSearchSubmit,
} from "../NavbarFunctions/NavbarFunctions";

interface Props {
  isMenuOpened: boolean;
}

const Menu = ({ isMenuOpened }: Props): JSX.Element => {
  const { stringToSearch, headerTitle } = useAppSelector((state) => state.ui);

  const { user } = useAppSelector((state) => state);

  const [, setModal] = useState(false);
  const [isSearchClicked, setSearch] = useState(false);
  const [, setMenu] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let classButtonSearch = ``;

  const userImage = user.image || noPhoto;

  const searchPlaceHolderText = "Search by name or category...";

  const loadFavs = () => {
    dispatch(isMenuOpenActionCreator(false));

    dispatch(modalTypeActionCreator(""));
    dispatch(headerLastTitleActionCreator(headerTitle));
    dispatch(headerTitleActionCreator("Favourites"));

    navigate("/penguins/favs");
  };

  const loadLikes = () => {
    dispatch(isMenuOpenActionCreator(false));

    dispatch(modalTypeActionCreator(""));
    dispatch(headerLastTitleActionCreator(headerTitle));
    dispatch(headerTitleActionCreator("Likes"));

    navigate("/penguins/likes");
  };

  const loadHome = () => {
    dispatch(isMenuOpenActionCreator(false));

    dispatch(modalTypeActionCreator(""));
    dispatch(headerLastTitleActionCreator(headerTitle));
    dispatch(headerTitleActionCreator("Home"));

    navigate("/penguins");
  };

  const addFav = () => {
    dispatch(isMenuOpenActionCreator(false));
    setMenu((prevState) => !prevState);

    dispatch(resetPenguinThunk());

    navigate("/create");
  };

  const handleLogoutCall = () => {
    handleLogout(dispatch);
  };

  const handleAbout = () => {
    dispatch(isMenuOpenActionCreator(false));

    dispatch(modalTypeActionCreator("About"));

    dispatch(isModalOpenActionCreator(true));
  };

  const handleHelp = () => {
    dispatch(isMenuOpenActionCreator(false));

    dispatch(modalTypeActionCreator("Help"));

    dispatch(isModalOpenActionCreator(true));
  };

  const handleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.title;

    switch (type) {
      case "desktop-bt-search":
        handleFocusCall(".menu-search-input");
        setMenu(false);
        dispatch(isMenuOpenActionCreator(false));
        break;
      case "bt-search":
        handleFocusCall(".search-input");
        break;
      default:
    }
    setSearch((prevState) => !prevState);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(stringToSearchActionCreator(event.target.value));
  };

  const handleSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(stringToSearchActionCreator(stringToSearch));
      handleSearchSubmitCall();
    }
  };

  const handleSearchSubmitCall = () => {
    handleSearchSubmit(
      dispatch,
      headerTitle,
      setMenu,
      setModal,
      stringToSearch
    );
  };

  const handleFocusCall = (field: string): void => {
    handleFocus(field);
  };

  const HidderSearch = isSearchClicked
    ? ` opacity-full ${classButtonSearch}`
    : ` ${classButtonSearch}`;

  return (
    <div className={`menu-app ${isMenuOpened ? "menu-open" : ""}`}>
      <div className="user-data-container">
        <img src={userImage} className="user-photo" alt="user" />
        <h3 className="user-username">{toPascalCase(`${user.username}`)}</h3>
      </div>
      <div className="menu-vertical">
        <hr className="hr-photo" />

        <button onClick={loadHome} className="bt-home" title="bt-home">
          <h3 className="menu-icon-label-vertical">Home</h3>
        </button>
        <button onClick={loadFavs} className="bt-favs" title="bt-favs">
          <h3 className="menu-icon-label-vertical">Favourites</h3>
        </button>
        <button onClick={loadLikes} className="bt-likes" title="bt-likes">
          <h3 className="menu-icon-label-vertical">Likes</h3>
        </button>
        <button onClick={addFav} className="bt-addfav" title="bt-fav">
          <h3 className="menu-icon-label-vertical">New...</h3>
        </button>
      </div>
      <div className="menu-horizontal">
        <div className="menu-search-container">
          <input
            className={`menu-search-input${HidderSearch}`}
            type="text"
            placeholder={searchPlaceHolderText}
            onChange={handleSearchChange}
            autoFocus
            value={stringToSearch}
            onKeyDown={handleSearchEnter}
          />
          <button
            onClick={handleSearchSubmitCall}
            className={`menu-bt-search-submit${HidderSearch}`}
            title="bt-search-submit"
          />
        </div>
        <hr className="hr-menu-horizontal" />
        <div className="menu-icons-horizontal">
          <button
            onClick={handleLogoutCall}
            className="bt-logout"
            title="btn-logout"
          />
          <button onClick={handleHelp} className="bt-help" title="bt-help" />
          <button onClick={handleAbout} className="bt-about" title="bt-about" />
          <button
            onClick={handleSearch}
            className="bt-search"
            title="bt-search"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
