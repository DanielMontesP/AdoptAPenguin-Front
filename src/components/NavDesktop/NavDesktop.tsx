import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  resetPenguinThunk,
  searchPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import "../../Styles/NavbarStyles.css";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import Menu from "../Menu/Menu";
import { Modal } from "../Modals/ModalPrompt";
import { ReactDimmer } from "react-dimmer";

interface Props {
  headerTitle: string;
}

const NavDektop = ({ headerTitle }: Props): JSX.Element => {
  const [, setMenu] = useState(false);
  const [, setModal] = useState(false);
  const [isSearchClicked, setSearch] = useState(false);

  const { penguin } = useAppSelector((state) => state.penguins);

  const { stringToSearch, modalMessage, isMenuOpen, isModalOpen, modalType } =
    useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const classButton = `desktop-btn bt-`;

  let classIconHeader = `header`;
  let classButtonHome = `${classButton}home`;
  let classButtonLikes = `${classButton}likes`;
  let classButtonFavs = `${classButton}favs`;
  let classButtonAbout = `${classButton}about`;
  let classButtonHelp = `${classButton}help`;
  let classButtonNew = `${classButton}new`;
  let classIconFavs = `${classIconHeader}-favs-icon`;
  let classIconLikes = `${classIconHeader}-likes-icon`;
  let classIconHome = `${classIconHeader}-home-icon`;
  let classIconEdit = `${classIconHeader}-edit-icon`;
  let classIconNew = `${classIconHeader}-new-icon`;
  let classIconDetail = `${classIconHeader}-detail-icon`;

  let classInputSearch = `search-input`;

  switch (headerTitle) {
    case "Home":
      classButtonHome = `${classButtonHome} selected`;
      classButtonLikes = `${classButton}likes`;
      classButtonFavs = `${classButton}favs`;
      classButtonAbout = `${classButton}about`;
      classIconHeader = classIconHome;

      break;
    case "New...":
      classButtonFavs = `${classButtonFavs}`;
      classButtonHome = `${classButton}home`;
      classButtonLikes = `${classButton}likes`;
      classButtonAbout = `${classButton}about`;
      classButtonNew = `${classButtonNew} selected`;
      classIconHeader = classIconNew;

      break;
    case "Edit...":
      classButtonFavs = `${classButtonFavs}`;
      classButtonHome = `${classButton}home`;
      classButtonLikes = `${classButton}likes`;
      classButtonAbout = `${classButton}about`;
      classIconHeader = classIconEdit;

      break;
    case "Likes":
      classButtonLikes = `${classButtonLikes} selected`;
      classButtonHome = `${classButton}home`;
      classButtonFavs = `${classButton}favs`;
      classButtonAbout = `${classButton}about`;
      classButtonAbout = `${classButton}about`;
      classIconHeader = classIconLikes;

      break;
    case "Favourites":
      classButtonFavs = `${classButtonFavs} selected`;
      classButtonHome = `${classButton}home`;
      classButtonLikes = `${classButton}likes`;
      classButtonAbout = `${classButton}about`;
      classIconHeader = classIconFavs;

      break;
    case "Detail":
      classButtonFavs = `${classButtonFavs}`;
      classButtonHome = `${classButton}home`;
      classButtonLikes = `${classButton}likes`;
      classButtonAbout = `${classButton}about`;

      classIconHeader = classIconDetail;
      break;
    default:
      classButtonHome = `${classButton}home selected`;
      classButtonFavs = `${classButton}favs`;
      classButtonLikes = `${classButton}likes`;
      classButtonAbout = `${classButton}about`;
  }

  const searchPlaceHolderText = "Search by name or category...";
  let HidderDesktopButtons = "";

  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    const message = "Log out?";
    const newModalType = "logOutUser";

    dispatch(modalTypeActionCreator(newModalType));
    dispatch(modalMessageActionCreator(message));

    setMenu(false);

    setModal((prevState) => !prevState);
    dispatch(isModalOpenActionCreator(true));
  };

  const loadFavs = () => {
    setMenu(false);

    dispatch(modalTypeActionCreator(""));
    dispatch(headerLastTitleActionCreator(headerTitle));
    dispatch(headerTitleActionCreator("Favourites"));

    navigate("/penguins/favs");
  };

  const loadLikes = () => {
    setMenu(false);

    dispatch(modalTypeActionCreator(""));
    dispatch(headerLastTitleActionCreator(headerTitle));
    dispatch(headerTitleActionCreator("Likes"));

    navigate("/penguins/likes");
  };

  const loadHome = () => {
    setMenu(false);

    dispatch(modalTypeActionCreator(""));
    dispatch(headerLastTitleActionCreator(headerTitle));
    dispatch(headerTitleActionCreator("Home"));

    navigate("/penguins");
  };

  const addFav = () => {
    setMenu(false);

    dispatch(resetPenguinThunk());

    navigate("/create");
  };

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
    dispatch(isMenuOpenActionCreator(true));
  };

  const handleAbout = () => {
    dispatch(modalTypeActionCreator("About"));

    setMenu(false);

    classButtonAbout = `${classButtonAbout} selected`;
    classButtonHome = `${classButton}home`;
    classButtonLikes = `${classButton}likes`;
    classButtonFavs = `${classButton}favs`;

    setModal((prevState) => !prevState);
    dispatch(isModalOpenActionCreator(true));
  };

  const handleHelp = () => {
    dispatch(modalTypeActionCreator("Help"));

    classButtonHelp = `${classButtonHelp} selected`;
    classButtonHome = `${classButton}home`;
    classButtonLikes = `${classButton}likes`;
    classButtonFavs = `${classButton}favs`;
    classButtonAbout = `${classButton}about`;

    setModal((prevState) => !prevState);
    dispatch(isModalOpenActionCreator(true));
  };

  const handleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.title;

    switch (type) {
      case "desktop-bt-search":
        handleFocus(".menu-search-input");
        setMenu(false);
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
    setMenu(false);

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
        <button className={classButtonHome} onClick={loadHome} title="btn-home">
          Home
        </button>
        <button className={classButtonFavs} onClick={loadFavs} title="btn-favs">
          Favourites
        </button>
        <button
          className={classButtonLikes}
          onClick={loadLikes}
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
          onKeyDown={handleSearchEnter}
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
            onClick={handleSearchSubmit}
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
          onClick={handleLogout}
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
        <Menu isMenuOpen={isMenuOpen} isModalOpen={isModalOpen} />
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
        isOpen={isMenuOpen || isModalOpen}
        exitDimmer={setMenu || setModal}
        zIndex={90}
        blur={1.5}
      />
    </div>
  );
};

export default NavDektop;
