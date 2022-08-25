import { useState } from "react";
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
interface Props {
  headerTitle: string;
}

const Navbar = ({ headerTitle }: Props): JSX.Element => {
  const [isMenuOpen, setMenu] = useState(false);
  const [isModalOpen, setModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state);
  const { modalMessage } = useAppSelector((state) => state.ui);
  const { modalType } = useAppSelector((state) => state.ui);
  const { penguin } = useAppSelector((state) => state.penguins);

  const userImage = user.image || noPhoto;

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
    // loadFavsThunk();
    navigate("/penguins/favs");
  };

  const loadLikes = () => {
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }
    // loadLikesThunk();
    navigate("/penguins/likes");
  };

  const loadHome = () => {
    if (isMenuOpen) {
      setMenu((prevState) => !prevState);
    }
    // loadPenguinsThunk();
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

    classButtonAbout = `${classButtonAbout} selected`;
    classButtonHome = `${classButton}home`;
    classButtonLikes = `${classButton}likes`;
    classButtonFavs = `${classButton}favs`;

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

  const HidderBack =
    document.location.href.includes("/login") ||
    document.location.href.includes("/homepage") ||
    document.location.href.includes("/register") ||
    document.location.href.substring(
      document.location.href.length,
      document.location.href.length - 3
    ) === "ins"
      ? "bt-search"
      : "bt-back";

  const HidderMenu =
    document.location.href.includes("/homepage") ||
    document.location.href.includes("/login") ||
    document.location.href.includes("/register")
      ? " display-none"
      : "";

  const HidderLogout: string =
    document.location.href.includes("/homepage") ||
    document.location.href.includes("/login") ||
    document.location.href.includes("/register")
      ? " display-none"
      : "";

  const isLikesPage = headerTitle.includes("Likes");
  const isFavsPage = headerTitle.includes("Favourites");

  let headerIconType = isLikesPage ? " header-likes" : "";
  headerIconType = isFavsPage ? " header-favs" : headerIconType;

  const headerClass = `header${headerIconType}`;
  const headerClassDesktop = `desktop-header${headerIconType}`;

  const classButton = `desktop-btn btn-`;

  let classIconHeader = `header`;
  let classButtonHome = `${classButton}home`;
  let classButtonLikes = `${classButton}likes`;
  let classButtonFavs = `${classButton}favs`;
  let classButtonAbout = `${classButton}about`;
  let classIconFavs = `${classIconHeader}-favs-icon`;
  let classIconLikes = `${classIconHeader}-likes-icon`;
  let classIconHome = `${classIconHeader}-home-icon`;

  let hidderDesktopButtons = "";

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
      <div className={headerClass}>
        <button title="btn-back" className={HidderBack} onClick={handleClick} />
        <img className="header-favs-icon" alt="Page Icon" />
        <h1 className={`header-title`}>{headerTitle}</h1>
        <button
          className={`menu-btn${HidderMenu}`}
          onClick={handleMenu}
          title="btn-menu"
        />
      </div>

      <div className={headerClassDesktop}>
        <div className="desktop-header">
          <button
            title="btn-back"
            className={HidderBack}
            onClick={handleClick}
          />
          <img className={classIconHeader} alt="Page Icon" />
          <h1 className={`desktop-header-title`}>AdoptAPenguin.com</h1>
        </div>
        <div className={`desktop-header-buttons${hidderDesktopButtons}`}>
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
            className={classButtonAbout}
            onClick={handleAbout}
            title="btn-about"
          >
            About
          </button>
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
      <div className="nav">
        <div className={`app-menu ${isMenuOpen ? "menu-open" : ""}`}>
          <div className="menu-header">
            <div className="menu-header-horizontal">
              <hr className="hr-menu-horizontal" />
              <div className="menu-icons-horizontal">
                <button
                  onClick={handleLogoutMenu}
                  className="bt-logout"
                  title="btn-logout"
                />
                <button
                  onClick={loadHome}
                  className="bt-home"
                  title="bt-home"
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
            <div className="menu-header-vertical">
              <div className="menu-icons-vertical">
                <hr className="hr-photo" />
                <button
                  onClick={loadLikes}
                  className="bt-likes"
                  title="bt-likes"
                >
                  <h3 className="menu-icon-label-vertical">Likes</h3>
                </button>

                <button onClick={loadFavs} className="bt-favs" title="bt-favs">
                  <h3 className="menu-icon-label-vertical">Favourites</h3>
                </button>
                <button onClick={addFav} className="bt-addfav" title="bt-fav">
                  <h3 className="menu-icon-label-vertical">New...</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
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
