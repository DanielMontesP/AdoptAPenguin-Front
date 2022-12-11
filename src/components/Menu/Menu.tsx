import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import noPhoto from "../../images/userPhoto.png";
import { toPascalCase } from "../../functions/sysHandlers/sysHandlers";
import {
  addNewFav,
  handleFocus,
  handleLogoutPrompt,
  handleSearchSubmit,
  loadAbout,
  loadFavs,
  loadHelp,
  loadHome,
  loadLikes,
} from "../../functions/uiHandlers/uiHandlers";

interface Props {
  isMenuOpened: boolean;
}

const Menu = ({ isMenuOpened }: Props): JSX.Element => {
  const { stringToSearch, headerTitle } = useAppSelector((state) => state.ui);

  const { user } = useAppSelector((state) => state);
  const { connected } = useAppSelector((state) => state.system.server);

  const [, setModal] = useState(false);
  const [isSearchClicked, setSearch] = useState(false);
  const [, setMenu] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let classButtonSearch = ``;

  const userImage = user.image || noPhoto;

  const searchPlaceHolderText = "Search by name/category/description...";

  const handleFavs = () => {
    loadFavs(dispatch, headerTitle, setMenu, navigate);
    dispatch(isMenuOpenActionCreator(false));
  };

  const handleLikes = () => {
    loadLikes(dispatch, headerTitle, setMenu, navigate);
    dispatch(isMenuOpenActionCreator(false));
  };

  const handleHome = () => {
    loadHome(dispatch, headerTitle, navigate, setMenu);
    dispatch(isMenuOpenActionCreator(false));
  };

  const addFav = () => {
    addNewFav(dispatch, navigate);
    dispatch(isMenuOpenActionCreator(false));
  };

  const handleLogoutCall = () => {
    handleLogoutPrompt(dispatch, navigate);
  };

  const handleAbout = () => {
    loadAbout(dispatch);
  };

  const handleHelp = () => {
    loadHelp(dispatch);
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

  const handleSettings = () => {
    dispatch(modalTypeActionCreator("Settings"));
    dispatch(isMenuOpenActionCreator(false));
    dispatch(isModalOpenActionCreator(true));
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

  const viewMessages = () => {
    setMenu(false);
    dispatch(isMenuOpenActionCreator(false));
    navigate(`/users/messages/${user.id}`);
  };

  const handleStatus = () => {
    return connected ? " Connected" : " local";
  };
  const classServerStatus = connected ? "server" : "local";

  const HidderSearch = isSearchClicked
    ? ` opacity-full ${classButtonSearch}`
    : ` ${classButtonSearch}`;

  return (
    <div className={`menu-app ${isMenuOpened ? "menu-open" : ""}`}>
      <div className="user-data-container">
        <img src={userImage} className="user-photo" alt="user" />
        <h3 className="user-username">{toPascalCase(`${user.username}`)}</h3>
      </div>
      <h3 className="server-status-container">
        <span className={`server-status-${classServerStatus}`}>
          {handleStatus()}
        </span>
      </h3>
      <div className="menu-vertical">
        <hr className="menu-hr-photo" />

        <button onClick={handleHome} className="bt-home" title="bt-home">
          <h3 className="menu-icon-label-vertical">Home</h3>
        </button>
        <button onClick={handleFavs} className="bt-favs" title="bt-favs">
          <h3 className="menu-icon-label-vertical">Favorites</h3>
        </button>
        <button onClick={handleLikes} className="bt-likes" title="bt-likes">
          <h3 className="menu-icon-label-vertical">Likes</h3>
        </button>
        <button
          onClick={viewMessages}
          className="bt-menu-view-messages"
          title="bt-view-messages"
        >
          <h3 className="menu-icon-label-vertical">Inbox</h3>
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
        <hr className="menu-hr-horizontal" />
        <div className="menu-icons-horizontal">
          <button
            onClick={handleLogoutCall}
            className="bt-logout"
            title="btn-logout"
          />
          <button onClick={handleHelp} className="bt-help" title="bt-help" />
          <button onClick={handleAbout} className="bt-about" title="bt-about" />
          <button
            onClick={handleSettings}
            className="bt-settings"
            title="bt-settings"
          />
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
