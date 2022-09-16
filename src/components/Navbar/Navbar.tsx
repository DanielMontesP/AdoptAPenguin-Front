import { ChangeEvent, useState } from "react";
import { ReactDimmer } from "react-dimmer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { Modal } from "../Modals/ModalPrompt";
import {
  resetPenguinThunk,
  searchPenguinThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import "../../Styles/NavbarStyles.css";
import { toPascalCase, blankFormData } from "../../utils/utils";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  modalMessageActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import noPhoto from "../../images/userPhoto.png";
import { ToastContainer } from "react-toastify";
interface Props {
  headerTitle: string;
}

const Navbar = ({ headerTitle }: Props): JSX.Element => {
  const [isMenuOpen, setMenu] = useState(false);
  const [isModalOpen, setModal] = useState(false);
  const [isSearchClicked, setSearch] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state);
  const { modalMessage } = useAppSelector((state) => state.ui);
  const { modalType } = useAppSelector((state) => state.ui);
  const { penguin } = useAppSelector((state) => state.penguins);
  const { isDesktop } = useAppSelector((state) => state.ui);
  const { headerLastTitle } = useAppSelector((state) => state.ui);
  let { stringToSearch } = useAppSelector((state) => state.ui);

  const [, setFormData] = useState(blankFormData);

  const userImage = user.image || noPhoto;
  const isForm = headerTitle === "New..." || headerTitle === "Edit...";

  const classButton = `desktop-btn bt-`;

  let classIconHeader = `header`;
  let classButtonHome = `${classButton}home`;
  let classButtonLikes = `${classButton}likes`;
  let classButtonFavs = `${classButton}favs`;
  let classButtonAbout = `${classButton}about`;
  let classButtonHelp = `${classButton}help`;
  let classIconFavs = `${classIconHeader}-favs-icon`;
  let classIconLikes = `${classIconHeader}-likes-icon`;
  let classIconHome = `${classIconHeader}-home-icon`;
  let classButtonAddFav = `${classButton}addFav`;
  let classButtonSearch = ``;

  const searchPlaceHolderText = "Search by name or category...";

  const isLogged =
    document.location.href.includes("/login") ||
    document.location.href.includes("/homepage") ||
    document.location.href.includes("/register");

  let hidderDesktopButtons = isLogged ? " display-none" : "";

  const isHome = headerTitle === "Home" && !isDesktop;

  const handleLogout = (type: string) => {
    const message = "Log out?";
    const newModalType = "logOutUser";

    dispatch(modalTypeActionCreator(newModalType));
    dispatch(modalMessageActionCreator(message));

    if (type === "fromMenu") {
      setMenu((prevState) => !prevState);
    }

    setModal((prevState) => !prevState);
  };

  const handleLogoutMenu = () => {
    handleLogout("fromMenu");
  };

  const handleLogoutHeader = () => {
    handleLogout("fromHeader");
  };

  const loadFavs = () => {
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }
    dispatch(modalTypeActionCreator(""));
    dispatch(headerTitleActionCreator("Favourites"));
    navigate("/penguins/favs");
  };

  const loadLikes = () => {
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }
    dispatch(modalTypeActionCreator(""));
    dispatch(headerTitleActionCreator("Likes"));
    navigate("/penguins/likes");
  };

  const loadHome = () => {
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }
    dispatch(modalTypeActionCreator(""));
    dispatch(headerTitleActionCreator("Home"));
    navigate("/penguins");
  };

  const addFav = () => {
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }
    dispatch(resetPenguinThunk());

    navigate("/create");
  };

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  const handleAbout = () => {
    dispatch(modalTypeActionCreator("About"));
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }
    classButtonAbout = `${classButtonAbout} selected`;
    classButtonHome = `${classButton}home`;
    classButtonLikes = `${classButton}likes`;
    classButtonFavs = `${classButton}favs`;

    setModal((prevState) => !prevState);
  };

  const handleHelp = () => {
    dispatch(modalTypeActionCreator("Help"));
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }
    classButtonHelp = `${classButtonHelp} selected`;
    classButtonHome = `${classButton}home`;
    classButtonLikes = `${classButton}likes`;
    classButtonFavs = `${classButton}favs`;
    classButtonAbout = `${classButton}about`;

    setModal((prevState) => !prevState);
  };

  const handleBack = () => {
    setFormData(blankFormData);
    dispatch(modalTypeActionCreator(""));

    switch (headerLastTitle) {
      case "Favourites":
        dispatch(headerTitleActionCreator("Favourites"));
        navigate("/penguins/favs");
        break;

      case "Likes":
        dispatch(headerTitleActionCreator("Likes"));
        navigate("/penguins/likes");
        break;

      default:
        dispatch(headerTitleActionCreator("Home"));
        navigate("/penguins");
    }
  };

  const handleSearch = (type: string) => {
    if (type === "fromNavBar") {
      if (isMenuOpen) {
        setMenu((prevState) => !prevState);
      }
    }
    setSearch((prevState) => !prevState);
  };

  const handleSearchFromNavBar = () => {
    handleSearch("fromNavBar");
  };

  const handleSearchFromMenu = () => {
    handleSearch("fromMenu");
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(stringToSearchActionCreator(event.target.value));
  };

  const handleSearchSubmit = (): void => {
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }
    if (stringToSearch !== "") {
      dispatch(modalTypeActionCreator("FFeature"));
      dispatch(searchPenguinThunk(stringToSearch));

      setSearch((prevState) => !prevState);

      dispatch(stringToSearchActionCreator(stringToSearch));
      dispatch(headerLastTitleActionCreator(headerTitle));
      dispatch(headerTitleActionCreator("Search results..."));
    } else {
      dispatch(modalTypeActionCreator("Search"));
      dispatch(modalMessageActionCreator("Please enter a search term"));
      setModal((prevState) => !prevState);
    }
  };

  const HidderSearch = isSearchClicked
    ? ` opacity-full ${classButtonSearch}`
    : ` ${classButtonSearch}`;

  const setClassBack = "bt-back";

  const HidderBack =
    (isDesktop && !isForm) || headerTitle === "AdoptAPenguin.com"
      ? " display-none"
      : "";

  const classBack = setClassBack + HidderBack;
  const HidderMenu = isLogged ? " display-none" : "";
  const HidderLogout: string = isLogged ? " display-none" : "";
  const HidderHelp: string = isLogged ? " display-none" : "";
  const HidderAbout: string = isLogged ? " display-none" : "";

  const isLikesPage = headerTitle.includes("Likes");
  const isFavsPage = headerTitle.includes("Favourites");

  let headerIconType = isLikesPage ? " header-likes" : "";
  headerIconType = isFavsPage ? " header-favs" : headerIconType;

  const hidderApp = "";
  const headerClass = `header${headerIconType}${hidderApp}`;
  const headerClassDesktop = `header-desktop${headerIconType}${hidderApp}`;

  const getModalType = () => {
    const newModalType = modalType;
    return newModalType;
  };

  if (modalType !== "FFeature") {
    switch (headerTitle) {
      case "Home":
        classButtonHome = `${classButtonHome} selected`;
        classButtonLikes = `${classButton}likes`;
        classButtonFavs = `${classButton}favs`;
        classButtonAbout = `${classButton}about`;
        classIconHeader = classIconHome;
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
        break;
      default:
        classButtonHome = `${classButton}home selected`;
        classButtonFavs = `${classButton}favs`;
        classButtonLikes = `${classButton}likes`;
        classButtonAbout = `${classButton}about`;
    }
  }

  return (
    <div className={`app`}>
      {!isDesktop ? (
        <div className={headerClass}>
          <div className="header-title-container">
            {!isHome && (
              <button
                title="btn-back"
                className={classBack}
                onClick={handleBack}
              />
            )}
            <img className="header-favs-icon" alt="Page Icon" />
            <h1
              className={
                isLogged ? `header-desktop-title1` : `header-desktop-title`
              }
            >
              {headerTitle}
            </h1>
            <h1
              className={
                isLogged
                  ? `header-desktop-title2`
                  : `header-desktop-title display-none`
              }
            >
              Amazing features...
            </h1>
            <h1
              className={
                isLogged
                  ? `header-desktop-title3`
                  : `header-desktop-title display-none`
              }
            >
              Responsive site
            </h1>
          </div>
          <button
            className={`menu-btn${HidderMenu}`}
            onClick={handleMenu}
            title="btn-menu"
          />
        </div>
      ) : (
        <div className={headerClassDesktop}>
          <div className="header-title-container">
            {!isHome && (
              <button
                title="btn-back"
                className={classBack}
                onClick={handleBack}
              />
            )}
            <img className={classIconHeader} alt="Page Icon" />
            <h1
              className={
                isLogged
                  ? `header-desktop-title1`
                  : `header-desktop-title display-none`
              }
            >
              Responsive site
            </h1>
            <h1
              className={
                isLogged
                  ? `header-desktop-title2`
                  : `header-desktop-title display-none`
              }
            >
              Amazing features...
            </h1>
            <h1
              className={
                isLogged ? `header-desktop-title3` : `header-desktop-title`
              }
            >
              {headerTitle}
            </h1>
          </div>
          <div className={`header-desktop-buttons${hidderDesktopButtons}`}>
            <button
              className={classButtonHome}
              onClick={loadHome}
              title="btn-home"
            >
              Home
            </button>
            <button
              className={classButtonFavs}
              onClick={loadFavs}
              title="btn-favs"
            >
              Favourites
            </button>
            <button
              className={classButtonLikes}
              onClick={loadLikes}
              title="btn-likes"
            >
              Likes
            </button>
            <button
              className={classButtonAddFav}
              onClick={addFav}
              title="btn-addFav"
            >
              New
            </button>
            <input
              className={`search-input${HidderSearch}`}
              type="text"
              placeholder={searchPlaceHolderText}
              onChange={handleSearchChange}
              autoFocus
              value={stringToSearch}
            />
            <div className="search-container">
              <button
                onClick={handleSearchFromNavBar}
                className={`desktop-bt-search${HidderSearch}`}
                title="bt-search"
              />
              <button
                onClick={handleSearchSubmit}
                className={`desktop-bt-search-submit${HidderSearch}`}
                title="bt-search-submit"
              />
            </div>
            <button
              onClick={handleAbout}
              className={`desktop-bt-about${HidderAbout}`}
              title="bt-about"
            />
            <button
              onClick={handleHelp}
              className={`desktop-bt-help${HidderHelp}`}
              title="desktop-btn-menu"
            />
            <button
              onClick={handleMenu}
              className={`desktop-bt-menu${HidderMenu}`}
              title="desktop-btn-menu"
            />
            <button
              onClick={handleLogoutHeader}
              className={`desktop-bt-logout${HidderLogout}`}
              title="desktop-btn-logout"
            />
          </div>
        </div>
      )}
      <div className="nav">
        <div className={`menu-app ${isMenuOpen ? "menu-open" : ""}`}>
          <div className="user-data-container">
            <img src={userImage} className="user-photo" alt="user" />
            <h3 className="user-username">
              {toPascalCase(`${user.username}`)}
            </h3>
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
                onClick={handleLogoutMenu}
                className="bt-logout"
                title="btn-logout"
              />
              <button
                onClick={handleHelp}
                className="bt-help"
                title="bt-help"
              />
              <button
                onClick={handleAbout}
                className="bt-about"
                title="bt-about"
              />
              <button
                onClick={handleSearchFromMenu}
                className="bt-search"
                title="bt-search"
              ></button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer limit={4} />
      {isModalOpen && (
        <Modal
          type={getModalType()}
          idPenguin={penguin.id}
          message={modalMessage}
          closeModal={setModal}
        />
      )}

      <ReactDimmer
        isOpen={isMenuOpen}
        exitDimmer={setMenu}
        zIndex={90}
        blur={1.5}
      />
      <ReactDimmer
        isOpen={isModalOpen}
        exitDimmer={setModal}
        zIndex={90}
        blur={1.5}
      />
    </div>
  );
};

export default Navbar;
