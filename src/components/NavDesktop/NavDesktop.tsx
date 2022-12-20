import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { resetPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import "../../styles/NavbarStyles.css";
import {
  isMenuOpenActionCreator,
  isSearchOpenActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import {
  handleSearchSubmit,
  loadFavs,
  loadHome,
  loadLikes,
  handleSearchEnter,
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
  const { stringToSearch, isMenuOpen, isSearchOpen } = useAppSelector(
    (state) => state.ui
  );
  const classButton = `desktop-btn bt-`;

  const { newMessages } = useAppSelector((state) => state.user);

  let classButtonHome = `${classButton}home`;
  let classButtonLikes = `${classButton}likes`;
  let classButtonFavs = `${classButton}favs`;
  let classButtonNew = `${classButton}new`;
  let classInputSearch = `search-input`;

  const searchPlaceHolderText = "Search by name/category/description...";
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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(stringToSearchActionCreator(event.target.value));
  };

  const handleSearchSubmitCall = () => {
    handleSearchSubmit(dispatch, headerTitle, stringToSearch);
  };

  const handleSearchEnterCall = (
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    handleSearchEnter(event, stringToSearch, dispatch, headerTitle);
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

  const setOpacityFull = " opacity-full";

  const HidderSearch = isSearchOpen
    ? `${classInputSearch} ${setOpacityFull}`
    : `${classInputSearch}`;

  return (
    <div className={`nav${setOpacityFull}`}>
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
          {isSearchOpen ? (
            <div className="search-container">
              <button
                onClick={handleSearchSubmitCall}
                className={`bt-search-submit ${HidderSearch.replace(
                  "search-input",
                  ""
                )}`}
                title="bt-search-submit"
              />
            </div>
          ) : (
            ""
          )}
          <button
            onClick={handleUserMenu}
            className={`bt-user${userMenuSelected}`}
            title="btn-user"
          />
        </div>
        {isSearchOpen ? (
          <input
            className={`${HidderSearch}`}
            type="text"
            placeholder={searchPlaceHolderText}
            onChange={handleSearchChange}
            onKeyDown={handleSearchEnterCall}
            autoFocus
            value={stringToSearch}
          />
        ) : (
          ""
        )}
      </div>{" "}
    </div>
  );
};

export default NavDektop;
