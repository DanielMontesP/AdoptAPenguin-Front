import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { resetPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import "../../rstyles/NavbarStyles.css";
import {
  isMenuOpenActionCreator,
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
import { getUserMessagesThunk } from "../../app/redux/thunks/userThunk/userThunk";
interface Props {
  headerTitle: string;
}

const NavDektop = ({ headerTitle }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state);

  const [isSearchClicked, setSearch] = useState(false);
  const { stringToSearch, isMenuOpen } = useAppSelector((state) => state.ui);
  const classButton = `desktop-btn bt-`;

  let classButtonHome = `${classButton}home`;
  let classButtonLikes = `${classButton}likes`;
  let classButtonFavs = `${classButton}favs`;
  let classButtonNew = `${classButton}new`;
  let classInputSearch = `search-input`;
  let classButtonViewMessages = `${classButton}view-messages`;

  const searchPlaceHolderText = "Search by name/category/description...";
  let HidderDesktopButtons = "";

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
    case "Inbox":
      classButtonViewMessages = `${classButtonViewMessages} selected`;
      break;
    default:
  }

  const addFav = () => {
    dispatch(isMenuOpenActionCreator(false));

    dispatch(resetPenguinThunk());

    navigate("/create");
  };

  const handleMenu = () => {
    dispatch(isMenuOpenActionCreator(!isMenuOpen));
  };

  const viewMessages = () => {
    dispatch(getUserMessagesThunk(user.id));
    navigate(`/users/messages/${user.id}`);
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

  const HidderSearch = isSearchClicked
    ? `${classInputSearch} opacity-full`
    : `${classInputSearch}`;

  return (
    <div className="nav">
      <h1 className={`header-desktop-title`}>AdoptApenguin.com</h1>
      <div className={`header-desktop-buttons${HidderDesktopButtons}`}>
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
        <button
          className={classButtonViewMessages}
          onClick={viewMessages}
          title="btn-view-messages"
        >
          Inbox
        </button>
        <input
          className={`${HidderSearch}`}
          type="text"
          placeholder={searchPlaceHolderText}
          onChange={handleSearchChange}
          onKeyDown={handleSearchEnterCall}
          autoFocus
          value={stringToSearch}
        />
        <div className="search-container">
          <button
            onClick={handleSearch}
            className={`bt-search`}
            title="bt-search"
          />
          <button
            onClick={handleSearchSubmitCall}
            className={`bt-search-submit ${HidderSearch.replace(
              "search-input",
              ""
            )}`}
            title="bt-search-submit"
          />
        </div>

        <button
          onClick={handleMenu}
          className={`bt-menu${HidderDesktopButtons}`}
          title="btn-menu"
        />
      </div>{" "}
    </div>
  );
};

export default NavDektop;
