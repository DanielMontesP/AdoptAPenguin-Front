import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import "../../Styles/NavbarStyles.css";
import { blankFormData } from "../../utils/utils";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import Menu from "../Menu/Menu";
import { Modal } from "../Modals/ModalPrompt";
import { ReactDimmer } from "react-dimmer";

interface Props {
  headerTitle: string;
}

const NavMobile = ({ headerTitle }: Props): JSX.Element => {
  const [, setMenu] = useState(false);
  const [, setModal] = useState(false);
  const [, setFormData] = useState(blankFormData);

  const { penguin } = useAppSelector((state) => state.penguins);

  const { modalMessage, modalType, headerLastTitle, isMenuOpen, isModalOpen } =
    useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let isHomePage = false;

  let headerIconType = "";
  let classHeaderTitle = "header-desktop-title";

  switch (headerTitle) {
    case "Home":
      isHomePage = true;
      headerIconType = " header-home-icon";
      break;
    case "Likes":
      headerIconType = " header-likes-icon";
      break;
    case "Favourites":
      headerIconType = " header-favs-icon";
      break;
    case "Detail":
      headerIconType = " header-detail-icon";
      break;
    case "New...":
      headerIconType = " header-new-icon";
      break;
    case "Edit...":
      headerIconType = " header-edit-icon";
      break;
    default:
  }
  classHeaderTitle += headerIconType;

  let HidderDesktopButtons = "";

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
    dispatch(isMenuOpenActionCreator(true));
  };

  const handleBack = () => {
    setFormData(blankFormData);
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

          <h1 className={classHeaderTitle}>{headerTitle}</h1>

          <button
            className={`menu-btn${HidderDesktopButtons}`}
            onClick={handleMenu}
            title="btn-menu"
          />
        </div>
      </div>
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

export default NavMobile;