import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { resetPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import "../../styles/NavbarStyles.css";
import {
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
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
import { ReactDimmer } from "react-dimmer";
import { Modal } from "../Modals/ModalPrompt";
import Menu from "../Menu/Menu";
interface Props {
  headerTitle: string;
}

const NavDektop = ({ headerTitle }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state);

  const [isSearchClicked, setSearch] = useState(false);
  const { stringToSearch, modalMessage, modalType, isModalOpen, isMenuOpen } =
    useAppSelector((state) => state.ui);
  const classButton = `desktop-btn bt-`;

  const { penguin } = useAppSelector((state) => state.penguins);

  const [isModalOpened, setModal] = useState(false);
  const [isMenuOpened, setMenu] = useState(false);

  let classButtonHome = `${classButton}home`;
  let classButtonLikes = `${classButton}likes`;
  let classButtonFavs = `${classButton}favs`;
  let classButtonNew = `${classButton}new`;
  let classInputSearch = `search-input`;
  let classButtonViewMessages = `${classButton}view-messages`;

  const searchPlaceHolderText = "Search by name/category/description...";
  let HidderDesktopButtons = "";

  const isOpen = isMenuOpen || isModalOpen;

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
    setMenu((prevState) => !prevState);

    dispatch(resetPenguinThunk());

    navigate("/create");
  };

  const handleUserMenu = () => {
    setMenu((prevState) => !prevState);

    dispatch(isMenuOpenActionCreator(true));
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

  const getModalType = () => {
    const newModalType = modalType;
    return newModalType;
  };

  const handleDimmer = () => {
    setMenu(false);
    dispatch(isMenuOpenActionCreator(false));
    dispatch(isModalOpenActionCreator(false));
  };

  const HidderSearch = isSearchClicked
    ? `${classInputSearch} opacity-full`
    : `${classInputSearch}`;

  return (
    <div className="nav">
      <div className="nav-header">
        <h1 className={`nav-title`}>AdoptApenguin.com</h1>
        <button
          onClick={handleSearch}
          className={`bt-search`}
          title="bt-search"
        />
        {isSearchClicked ? (
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
          className={`bt-user${HidderDesktopButtons}`}
          title="btn-user"
        />
      </div>
      <div className={`nav-buttons${HidderDesktopButtons}`}>
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
        </button>{" "}
        {isSearchClicked ? (
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
      {(isModalOpen || isModalOpened) && (
        <Modal
          idToProcess={penguin.id}
          content={modalMessage}
          closeModal={setModal}
          type={getModalType()}
          form="Penguin"
        />
      )}
      {isMenuOpen && isMenuOpened && (
        <div className={`menu-nav`}>
          <Menu isMenuOpened={isMenuOpen || isMenuOpened} />
        </div>
      )}
      {(isMenuOpened || isModalOpened) && (
        <div onClick={handleDimmer}>
          <ReactDimmer
            isOpen={isOpen}
            exitDimmer={setMenu || setModal}
            zIndex={90}
            blur={1.5}
          />
        </div>
      )}
    </div>
  );
};

export default NavDektop;
