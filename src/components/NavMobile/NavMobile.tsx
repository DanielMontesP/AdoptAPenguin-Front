import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import "../../styles/NavbarStyles.css";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import Menu from "../Menu/Menu";
import { BlankMessageDataInterface } from "../../app/redux/types/message/messageInterfaces";
import { ReactDimmer } from "react-dimmer";
import { Modal } from "../Modals/ModalPrompt";

interface Props {
  headerTitle: string;
}

const NavMobile = ({ headerTitle }: Props): JSX.Element => {
  const blankData: BlankMessageDataInterface = {
    idPenguin: "",
    idUser: "",
    subject: "",
    content: "",
    data: "",
    read: false,
  };
  const { modalMessage, modalType, isModalOpen, isMenuOpen, headerLastTitle } =
    useAppSelector((state) => state.ui);
  const [, setFormData] = useState(blankData);

  const { penguin } = useAppSelector((state) => state.penguins);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMenuOpened, setMenuOpen] = useState(false);
  const [, setModal] = useState(false);
  let isHomePage = headerTitle === "Home";

  let classHeaderTitle = "header-desktop-title";

  let HidderDesktopButtons = "";

  const getModalType = () => {
    const newModalType = modalType;
    return newModalType;
  };

  const handleMenu = () => {
    setMenuOpen((prevState) => !prevState);
    dispatch(isMenuOpenActionCreator(true));
  };

  const handleBack = () => {
    setFormData(blankData);
    dispatch(modalTypeActionCreator(""));

    switch (headerLastTitle) {
      case "Favorites":
        dispatch(headerLastTitleActionCreator(headerTitle));
        dispatch(headerTitleActionCreator("Favorites"));
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

export default NavMobile;
