import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  isSearchOpenActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import noPhoto from "../../images/userPhoto.png";
import { toPascalCase } from "../../functions/sysHandlers/sysHandlers";
import {
  addNewFav,
  handleLogoutPrompt,
  loadAbout,
  loadFavs,
  loadHelp,
  loadHome,
  loadLikes,
} from "../../functions/uiHandlers/uiHandlers";

interface Props {
  isMenuOpened: boolean;
}

const MenuMobile = ({ isMenuOpened }: Props): JSX.Element => {
  const { headerTitle } = useAppSelector((state) => state.ui);

  const { user } = useAppSelector((state) => state);
  const { connected } = useAppSelector((state) => state.system.server);

  const [isSearchClicked] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userImage = user.image || noPhoto;

  const handleFavs = () => {
    loadFavs(dispatch, headerTitle, navigate);
    dispatch(isMenuOpenActionCreator(false));
  };

  const handleLikes = () => {
    loadLikes(dispatch, headerTitle, navigate);
    dispatch(isMenuOpenActionCreator(false));
  };

  const handleHome = () => {
    loadHome(dispatch, headerTitle, navigate);
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
    dispatch(isMenuOpenActionCreator(false));
    dispatch(isSearchOpenActionCreator(true));
  };

  const handleSettings = () => {
    dispatch(modalTypeActionCreator("Settings"));
    dispatch(isMenuOpenActionCreator(false));
    dispatch(isModalOpenActionCreator(true));
  };

  const handleInbox = () => {
    dispatch(isMenuOpenActionCreator(false));
    dispatch(isMenuOpenActionCreator(false));
    navigate(`/users/messages/${user.id}`);
  };

  const handleStatus = () => {
    return connected ? " Connected" : " local";
  };
  const classServerStatus = connected ? "server" : "local";

  const HidderSearch = isSearchClicked ? ` opacity-full` : ``;

  return (
    <div className={`menu-app`}>
      <div className="menu-user-data">
        <img src={userImage} className="user-photo" alt="user" />
        <h3 className="user-username">{toPascalCase(`${user.username}`)}</h3>
      </div>
      <h3 className="menu-server-status">
        <span className={`${classServerStatus}-status`}>{handleStatus()}</span>
      </h3>

      <div className="menu-vertical">
        <button onClick={handleHome} className="bt-home" title="bt-home">
          <h3 className="menu-icon-label-vertical">Home</h3>
        </button>
        <button onClick={handleFavs} className="menu-bt-favs" title="bt-favs">
          <h3 className="menu-icon-label-vertical">Favorites</h3>
        </button>
        <button onClick={handleLikes} className="bt-likes" title="bt-likes">
          <h3 className="menu-icon-label-vertical">Likes</h3>
        </button>

        <button onClick={addFav} className="bt-addfav" title="bt-fav">
          <h3 className="menu-icon-label-vertical">New...</h3>
        </button>

        <button
          onClick={handleInbox}
          className="menu-bt-inbox"
          title="bt-view-messages"
        >
          <h3 className="menu-icon-label-vertical">Inbox</h3>
        </button>

        <button
          onClick={handleSearch}
          className={`menu-bt-search${HidderSearch}`}
          title="bt-search-submit"
        >
          {" "}
          <h3 className="menu-icon-label-vertical">Search</h3>
        </button>
      </div>
      <div className="menu-horizontal">
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
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
