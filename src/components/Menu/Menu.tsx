import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  resetPenguinThunk,
  searchPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import noPhoto from "../../images/userPhoto.png";
import { toPascalCase } from "../../utils/utils";

interface Props {
  isMenuOpen: boolean;
  isModalOpen: boolean;
}

const Menu = ({ isMenuOpen, isModalOpen }: Props): JSX.Element => {
  const { user } = useAppSelector((state) => state);

  const [, setModal] = useState(false);
  const [isSearchClicked, setSearch] = useState(false);
  const [, setMenu] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let classButtonSearch = ``;

  const { stringToSearch, headerTitle } = useAppSelector((state) => state.ui);

  const userImage = user.image || noPhoto;

  const searchPlaceHolderText = "Search by name or category...";

  const handleLogout = (event: MouseEvent<HTMLButtonElement>): void => {
    const message = "Log out?";
    const newModalType = "logOutUser";

    dispatch(modalTypeActionCreator(newModalType));
    dispatch(modalMessageActionCreator(message));

    setMenu((prevState) => !prevState);
    dispatch(isMenuOpenActionCreator(false));
    setModal((prevState) => !prevState);
    dispatch(isModalOpenActionCreator(true));
  };

  const loadFavs = () => {
    dispatch(isMenuOpenActionCreator(false));
    setMenu((prevState) => !prevState);

    dispatch(modalTypeActionCreator(""));
    dispatch(headerLastTitleActionCreator(headerTitle));
    dispatch(headerTitleActionCreator("Favourites"));

    navigate("/penguins/favs");
  };

  const loadLikes = () => {
    dispatch(isMenuOpenActionCreator(false));
    setMenu((prevState) => !prevState);

    dispatch(modalTypeActionCreator(""));
    dispatch(headerLastTitleActionCreator(headerTitle));
    dispatch(headerTitleActionCreator("Likes"));

    navigate("/penguins/likes");
  };

  const loadHome = () => {
    dispatch(isMenuOpenActionCreator(false));
    setMenu((prevState) => !prevState);

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

  const handleAbout = () => {
    dispatch(isMenuOpenActionCreator(false));
    setMenu((prevState) => !prevState);

    dispatch(modalTypeActionCreator("About"));

    setModal((prevState) => !prevState);
    dispatch(isModalOpenActionCreator(true));
  };

  const handleHelp = () => {
    dispatch(isMenuOpenActionCreator(false));
    setMenu((prevState) => !prevState);

    dispatch(modalTypeActionCreator("Help"));

    setModal((prevState) => !prevState);
    dispatch(isModalOpenActionCreator(true));
  };

  const handleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.title;

    switch (type) {
      case "desktop-bt-search":
        handleFocus(".menu-search-input");
        dispatch(isMenuOpenActionCreator(false));
        break;
      case "bt-search":
        handleFocus(".search-input");
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
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = (): void => {
    setMenu((prevState) => !prevState);

    if (stringToSearch !== "") {
      dispatch(modalTypeActionCreator("FFeature"));
      dispatch(searchPenguinThunk(stringToSearch));

      dispatch(stringToSearchActionCreator(stringToSearch));
      dispatch(headerLastTitleActionCreator(headerTitle));
      dispatch(headerTitleActionCreator("Search results..."));
    } else {
      dispatch(modalTypeActionCreator("Search"));
      dispatch(modalMessageActionCreator("Please enter a search term"));
      setModal((prevState) => !prevState);
    }
  };

  const handleFocus = (field: string): void => {
    const input = document.querySelector(field) as HTMLElement | null;
    if (input != null) {
      input.focus();
    }
  };

  const HidderSearch = isSearchClicked
    ? ` opacity-full ${classButtonSearch}`
    : ` ${classButtonSearch}`;

  return (
    <div className={`menu-app ${isMenuOpen ? "menu-open" : ""}`}>
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
            onClick={handleSearchSubmit}
            className={`menu-bt-search-submit${HidderSearch}`}
            title="bt-search-submit"
          />
        </div>
        <hr className="hr-menu-horizontal" />
        <div className="menu-icons-horizontal">
          <button
            onClick={handleLogout}
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