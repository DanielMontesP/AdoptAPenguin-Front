import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { resetPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import "../../styles/NavbarStyles.css";
import {
  isMenuOpenActionCreator,
  isSearchOpenActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import {
  loadFavs,
  loadHome,
  loadLikes,
  handleFocus,
} from "../../functions/uiHandlers/uiHandlers";
import MessageNotifyer from "../MessageNotifyer/MessageNotifyer";
interface Props {
  headerTitle: string;
}

const NavDektop = ({ headerTitle }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [, setSearch] = useState(false);
  const { isMenuOpen } = useAppSelector((state) => state.ui);
  const classButton = `desktop-btn bt-`;

  const { newMessages } = useAppSelector((state) => state.user);

  let classButtonHome = `${classButton}home`;
  let classButtonLikes = `${classButton}likes`;
  let classButtonFavs = `${classButton}favs`;
  let classButtonNew = `${classButton}new`;
  let userMenuSelected = isMenuOpen ? "-selected" : "";

  switch (headerTitle) {
    case "Home":
      classButtonHome = `${classButtonHome} selected`;
      break;
    case "New...":
      classButtonNew = `${classButtonNew} selected`;
      break;
    case "Likes":
      classButtonLikes = `${classButtonLikes} selected`;
      break;
    case "Favorites":
      classButtonFavs = `${classButtonFavs} selected`;
      break;

    default:
  }

  const addFav = () => {
    dispatch(resetPenguinThunk());

    navigate("/create");
  };

  const handleUserMenu = () => {
    dispatch(isMenuOpenActionCreator(!isMenuOpen));
  };

  const handleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.title;

    switch (type) {
      case "desktop-bt-search":
        handleFocusCall(".menu-search-input");
        break;
      case "bt-search":
        handleFocusCall(".search-input");
        break;
      default:
    }
    setSearch((prevState) => !prevState);
    dispatch(isSearchOpenActionCreator(true));
  };

  const loadHomeCall = () => {
    loadHome(dispatch, headerTitle, navigate);
  };

  const loadLikesCall = () => {
    loadLikes(dispatch, headerTitle, navigate);
  };

  const loadFavsCall = () => {
    loadFavs(dispatch, headerTitle, navigate);
  };

  const handleFocusCall = (field: string): void => {
    handleFocus(field);
  };

  return (
    <div className={`nav`}>
      <div className="nav-header">
        <h1 className={`nav-title`}>AdoptApenguin.com</h1>
      </div>
      <div className={`nav-buttons`}>
        <button
          className={classButtonHome}
          onClick={loadHomeCall}
          title="btn-home"
        >
          Home
        </button>
        <button
          className={classButtonFavs}
          onClick={loadFavsCall}
          title="btn-favs"
        >
          Favorites
        </button>
        <button
          className={classButtonLikes}
          onClick={loadLikesCall}
          title="btn-likes"
        >
          Likes
        </button>
        <button className={classButtonNew} onClick={addFav} title="btn-addFav">
          New
        </button>

        <div className="user-panel">
          <MessageNotifyer messages={newMessages} />
          <button
            onClick={handleSearch}
            className={`bt-search`}
            title="bt-search"
          />

          <button
            onClick={handleUserMenu}
            className={`bt-user${userMenuSelected}`}
            title="btn-user"
          />
        </div>
      </div>
    </div>
  );
};

export default NavDektop;
