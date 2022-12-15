import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { resetPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import "../../styles/NavbarStyles.css";
import {
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import Menu from "../Menu/Menu";
import {
  handleSearchSubmit,
  loadFavs,
  loadHome,
  loadLikes,
  handleSearchEnter,
  handleLogoutPrompt,
  handleFocus,
} from "../../functions/uiHandlers/uiHandlers";
import { ReactDimmer } from "react-dimmer";
import { Modal } from "../Modals/ModalPrompt";
import { getUserMessagesThunk } from "../../app/redux/thunks/userThunk/userThunk";
interface Props {
  headerTitle: string;
}

const NavDektop = ({ headerTitle }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { penguin } = useAppSelector((state) => state.penguins);
  const { user } = useAppSelector((state) => state);

  const [isMenuOpened, setMenuOpen] = useState(false);
  const [, setModal] = useState(false);
  const [isSearchClicked, setSearch] = useState(false);
  const { modalMessage, modalType, isModalOpen, isMenuOpen, stringToSearch } =
    useAppSelector((state) => state.ui);
  const classButton = `desktop-btn bt-`;

  let classButtonHome = `${classButton}home`;
  let classButtonLikes = `${classButton}likes`;
  let classButtonFavs = `${classButton}favs`;
  let classButtonNew = `${classButton}new`;
  let classInputSearch = `search-input`;
  let classButtonViewMessages = `${classButton}view-messages`;

  const searchPlaceHolderText = "Search by name/category/description...";
  let HidderDesktopButtons = "";

  const getModalType = () => {
    const newModalType = modalType;
    return newModalType;
  };

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
    setMenuOpen(false);

    dispatch(resetPenguinThunk());

    navigate("/create");
  };

  const handleMenu = () => {
    setMenuOpen((prevState) => !prevState);
    dispatch(isMenuOpenActionCreator(true));
  };

  const viewMessages = () => {
    dispatch(getUserMessagesThunk(user.id));
    navigate(`/users/messages/${user.id}`);
  };

  const handleLogoutCall = () => {
    handleLogoutPrompt(dispatch, navigate);
  };

  const handleAbout = () => {
    dispatch(modalTypeActionCreator("About"));

    dispatch(isModalOpenActionCreator(true));
  };

  const handleSettings = () => {
    dispatch(modalTypeActionCreator("Settings"));

    dispatch(isModalOpenActionCreator(true));
  };

  const handleHelp = () => {
    dispatch(modalTypeActionCreator("Help"));

    setModal((prevState) => !prevState);
    dispatch(isModalOpenActionCreator(true));
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
    handleSearchSubmit(
      dispatch,
      headerTitle,
      setMenuOpen,
      setModal,
      stringToSearch
    );
  };

  const handleSearchEnterCall = (
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    handleSearchEnter(
      event,
      stringToSearch,
      dispatch,
      setModal,
      setMenuOpen,
      headerTitle
    );
  };

  const loadHomeCall = () => {
    loadHome(dispatch, headerTitle, navigate, setMenuOpen);
  };

  const loadLikesCall = () => {
    loadLikes(dispatch, headerTitle, setMenuOpen, navigate);
  };

  const loadFavsCall = () => {
    loadFavs(dispatch, headerTitle, setMenuOpen, navigate);
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
            className={`desktop-bt-search`}
            title="bt-search"
          />
          <button
            onClick={handleSearchSubmitCall}
            className={`desktop-bt-search-submit ${HidderSearch.replace(
              "search-input",
              ""
            )}`}
            title="bt-search-submit"
          />
        </div>
        <button
          onClick={handleAbout}
          className={`desktop-bt-about${HidderDesktopButtons}`}
          title="bt-about"
        />
        <button
          onClick={handleHelp}
          className={`desktop-bt-help${HidderDesktopButtons}`}
          title="desktop-btn-help"
        />
        <button
          onClick={handleLogoutCall}
          className={`desktop-bt-logout${HidderDesktopButtons}`}
          title="desktop-btn-logout"
        />
        <button
          onClick={handleMenu}
          className={`desktop-bt-menu${HidderDesktopButtons}`}
          title="desktop-btn-menu"
        />
        <button
          onClick={handleSettings}
          className={`desktop-bt-settings${HidderDesktopButtons}`}
          title="desktop-btn-settings"
        />
      </div>{" "}
      <div className={`menu-nav`}>
        <Menu isMenuOpened={isMenuOpened && isMenuOpen} />
      </div>
      {isModalOpen && (
        <Modal
          idToProcess={penguin.id}
          content={modalMessage}
          closeModal={setModal}
          type={getModalType()}
          form="Penguin"
        />
      )}
      <ReactDimmer
        isOpen={(isMenuOpened && isMenuOpen) || isModalOpen}
        exitDimmer={setMenuOpen}
        zIndex={90}
        blur={1.5}
      />
    </div>
  );
};

export default NavDektop;
