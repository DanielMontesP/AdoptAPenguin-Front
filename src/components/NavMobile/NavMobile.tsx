import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import "../../Styles/NavbarStyles.css";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import Menu from "../Menu/Menu";
import { Modal } from "../Modals/ModalPrompt";
import { ReactDimmer } from "react-dimmer";
import { blankMessageDataInterface } from "../../app/redux/types/message/messageInterfaces";

interface Props {
  headerTitle: string;
}

const NavMobile = ({ headerTitle }: Props): JSX.Element => {
  const blankData: blankMessageDataInterface = {
    idPenguin: "",
    idUser: "",
    subject: "",
    content: "",
    data: "",
    read: "false",
  };

  const [isMenuOpened, setMenuOpen] = useState(false);
  const [, setModal] = useState(false);
  const [, setFormData] = useState(blankData);

  const { penguin } = useAppSelector((state) => state.penguins);

  const { modalMessage, modalType, headerLastTitle, isModalOpen, isMenuOpen } =
    useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let isHomePage = false;

  let headerIconType = "";
  let classHeaderTitle = "header-desktop-title";

  switch (headerTitle) {
    case "Home":
      isHomePage = true;
      headerIconType = "header-home-icon";
      break;
    case "Likes":
      headerIconType = "header-likes-icon";
      break;
    case "Favourites":
      headerIconType = "header-favs-icon";
      break;
    case "Detail":
      headerIconType = "header-detail-icon";
      break;
    case "New...":
      headerIconType = "header-new-icon";
      break;
    case "Edit...":
      headerIconType = "header-edit-icon";
      break;
    default:
  }

  let HidderDesktopButtons = "";

  const handleMenu = () => {
    setMenuOpen((prevState) => !prevState);
    dispatch(isMenuOpenActionCreator(true));
  };

  const handleBack = () => {
    setFormData(blankData);
    dispatch(modalTypeActionCreator(""));

    switch (headerLastTitle) {
      case "Favourites":
        dispatch(headerLastTitleActionCreator(headerTitle));
        dispatch(headerTitleActionCreator("Favourites"));
        navigate("/penguins/favs");
        break;

      case "Likes":
        dispatch(headerLastTitleActionCreator(headerTitle));
        dispatch(headerTitleActionCreator("Likes"));
        navigate("/penguins/likes");
        break;

      case "Detail":
        dispatch(headerLastTitleActionCreator(headerTitle));
        dispatch(headerTitleActionCreator("Detail"));
        navigate(`/detail/${penguin.id}`);
        break;

      default:
        dispatch(headerLastTitleActionCreator(headerTitle));
        dispatch(headerTitleActionCreator("Home"));
        navigate("/penguins");
    }
  };

  const headerClass = `header`;
  const classBack = "bt-back";

  const getModalType = () => {
    const newModalType = modalType;
    return newModalType;
  };

  return (
    <div className={`app`}>
      <div className={headerClass}>
        <div className="header-title-container">
          {!isHomePage && (
            <button
              title="btn-back"
              className={classBack}
              onClick={handleBack}
            />
          )}
          <div className={headerIconType} />
          <h1 className={classHeaderTitle}>{headerTitle}</h1>

          <button
            className={`menu-btn${HidderDesktopButtons}`}
            onClick={handleMenu}
            title="btn-menu"
          />
        </div>
      </div>
      <div className={`menu-nav`}>
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
        isOpen={(isMenuOpened && isMenuOpen) || isModalOpen}
        exitDimmer={setMenuOpen}
        zIndex={90}
        blur={1.5}
      />
    </div>
  );
};

export default NavMobile;
