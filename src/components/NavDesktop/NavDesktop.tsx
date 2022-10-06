import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { resetPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import "../../Styles/NavbarStyles.css";
import {
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import Menu from "../Menu/Menu";
import { Modal } from "../Modals/ModalPrompt";
import { ReactDimmer } from "react-dimmer";
import {
  handleLogout,
  handleSearchSubmit,
  loadFavs,
  loadHome,
  loadLikes,
  handleSearchEnter,
} from "../NavbarFunctions/NavbarFunctions";
import { handleFocus } from "../../utils/utils";
interface Props {
  headerTitle: string;
}

const NavDektop = ({ headerTitle }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModalOpened, setModal] = useState(false);
  const [isSearchClicked, setSearch] = useState(false);
  const [isMenuOpened, setMenu] = useState(false);

  const { penguin } = useAppSelector((state) => state.penguins);
  const { stringToSearch, modalMessage, modalType, isMenuOpen, isModalOpen } =
    useAppSelector((state) => state.ui);

  const classButton = `desktop-btn bt-`;

  let classButtonHome = `${classButton}home`;
  let classButtonLikes = `${classButton}likes`;
  let classButtonFavs = `${classButton}favs`;
  let classButtonNew = `${classButton}new`;
  let classInputSearch = `search-input`;

  const searchPlaceHolderText = "Search by name or category...";
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
    case "Favourites":
      classButtonFavs = `${classButtonFavs} selected`;
      break;
    default:
  }

  const addFav = () => {
    setMenu(false);

    dispatch(resetPenguinThunk());

    navigate("/create");
  };

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
    dispatch(isMenuOpenActionCreator(true));
  };

  const handleLogoutCall = () => {
    handleLogout(dispatch);
  };

  const handleAbout = () => {
    dispatch(modalTypeActionCreator("About"));

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
      setMenu,
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
      setMenu,
      headerTitle
    );
  };

  const loadHomeCall = () => {
    loadHome(dispatch, headerTitle, navigate);
  };

  const loadLikesCall = () => {
    loadLikes(dispatch, headerTitle, setMenu, navigate);
  };

  const loadFavsCall = () => {
    loadFavs(dispatch, headerTitle, setMenu, navigate);
  };

  const handleFocusCall = (field: string): void => {
    handleFocus(field);
  };

  const getModalType = () => {
    const newModalType = modalType;
    return newModalType;
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
          Favourites
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
      </div>{" "}
      <div className={`nav`}>
        <Menu isMenuOpened={isMenuOpened && isMenuOpen} />
      </div>
      {isModalOpen && (
        <Modal
          type={getModalType()}
          idPenguin={penguin.id}
          message={modalMessage}
          closeModal={setModal}
        />
      )}
      <ReactDimmer
        isOpen={(isMenuOpen && isMenuOpened) || isModalOpen || isModalOpened}
        exitDimmer={setMenu || setModal}
        zIndex={90}
        blur={1.5}
      />
    </div>
  );
};

export default NavDektop;
