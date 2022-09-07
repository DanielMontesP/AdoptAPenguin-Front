import { ChangeEvent, useState } from "react";
import { ReactDimmer } from "react-dimmer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { Modal } from "../Modals/ModalPrompt";
import { resetPenguinThunk } from "../../app/redux/thunks/penguinThunk/penguinThunk";
import "../../Styles/NavbarStyles.css";
import { toPascalCase } from "../../utils/utils";
import {
  modalMessageActionCreator,
  modalTypeActionCreator,
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

  const userImage = user.image || noPhoto;

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

  let hidderDesktopButtons = "";

  const isLogged =
    document.location.href.includes("/login") ||
    document.location.href.includes("/homepage") ||
    document.location.href.includes("/register");

  const handleClick = () => {
    if (headerTitle !== "Home") {
      handleBack();
    }
  };

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

    navigate("/penguins/favs");
  };

  const loadLikes = () => {
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }

    navigate("/penguins/likes");
  };

  const loadHome = () => {
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }

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
    switch (headerTitle) {
      case "Favourites":
        navigate("/penguins");
        break;
      case "Detail":
        navigate("/penguins/favs");
        break;
      case "Edit...":
        navigate("/penguins/favs");
        break;
      default:
        navigate("/penguins");
    }
  };

  const handleEdit = () => {
    setMenu((prevState) => !prevState);

    navigate(`/users/edit/${user.id}`);
  };

  const handleSearch = () => {
    setSearch((prevState) => !prevState);
  };

  // let stringToSearch = "";
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // stringToSearch = event.target.value;
  };

  const handleSearchSubmit = (): void => {
    dispatch(modalTypeActionCreator("FFeature"));
    setModal(true);
  };

  const HidderSearch = isSearchClicked ? " opacity-full" : "";

  const HidderBack =
    isLogged ||
    document.location.href.substring(
      document.location.href.length,
      document.location.href.length - 3
    ) === "ins"
      ? "bt-search"
      : "bt-back";

  const HidderMenu = isLogged ? " display-none" : "";
  const HidderLogout: string = isLogged ? " display-none" : "";
  const HidderHelp: string = isLogged ? " display-none" : "";
  const HidderAbout: string = isLogged ? " display-none" : "";

  const isLikesPage = headerTitle.includes("Likes");
  const isFavsPage = headerTitle.includes("Favourites");

  let headerIconType = isLikesPage ? " header-likes" : "";
  headerIconType = isFavsPage ? " header-favs" : headerIconType;

  const headerClass = `header${headerIconType}`;
  const headerClassDesktop = `header-desktop${headerIconType}`;

  const getModalType = () => {
    const newModalType = modalType;
    return newModalType;
  };

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
      hidderDesktopButtons = " display-none";
  }

  return (
    <div className="app">
      {!isDesktop ? (
        <div className={headerClass}>
          <button
            title="btn-back"
            className={HidderBack}
            onClick={handleClick}
          />
          <img className="header-favs-icon" alt="Page Icon" />
          <h1 className={`header-title`}>{headerTitle}</h1>
          <button
            className={`menu-btn${HidderMenu}`}
            onClick={handleMenu}
            title="btn-menu"
          />
        </div>
      ) : (
        <div className={headerClassDesktop}>
          <div className="header-desktop">
            <button
              title="btn-back"
              className={HidderBack}
              onClick={handleClick}
            />
            <img className={classIconHeader} alt="Page Icon" />
            <h1 className={`header-desktop-title`}>AdoptAPenguin.com</h1>
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
              placeholder="Search..."
              onChange={handleSearchChange}
            />
            <div className="search-container">
              <button
                onClick={handleSearch}
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
          <div className="menu-header">
            <div className="menu-horizontal">
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
              </div>
            </div>

            <div className="user-data-container">
              <img src={userImage} className="user-photo" alt="user" />
              <h3 className="user-username">
                {toPascalCase(`${user.username}`)}
              </h3>
              <button
                className={`animated menu-animatedEdit`}
                onClick={handleEdit}
                title="btn-edit"
              />
            </div>
            <div className="menu-vertical">
              <div className="menu-icons-vertical">
                <hr className="hr-photo" />
                <button onClick={loadHome} className="bt-home" title="bt-home">
                  <h3 className="menu-icon-label-vertical">Home</h3>
                </button>
                <button onClick={loadFavs} className="bt-favs" title="bt-favs">
                  <h3 className="menu-icon-label-vertical">Favourites</h3>
                </button>
                <button
                  onClick={loadLikes}
                  className="bt-likes"
                  title="bt-likes"
                >
                  <h3 className="menu-icon-label-vertical">Likes</h3>
                </button>
                <button onClick={addFav} className="bt-addfav" title="bt-fav">
                  <h3 className="menu-icon-label-vertical">New...</h3>
                </button>
              </div>
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
    </div>
  );
};

export default Navbar;
