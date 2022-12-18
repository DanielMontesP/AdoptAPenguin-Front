import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../../app/redux/hooks/hooks";
import "../../rstyles/NavbarStyles.css";
import MessageNotifyer from "../MessageNotifyer/MessageNotifyer";
import NavDektop from "../NavDesktop/NavDesktop";
import NavMobile from "../NavMobile/NavMobile";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

import { Modal } from "../Modals/ModalPrompt";
import { ReactDimmer } from "react-dimmer";
import Menu from "../Menu/Menu";
interface Props {
  headerTitle: string;
}

const Navbar = ({ headerTitle }: Props): JSX.Element => {
  const { isDesktop, modalMessage, isMenuOpen, isModalOpen, modalType } =
    useAppSelector((state) => state.ui);
  const { newMessages } = useAppSelector((state) => state.user);

  const { penguin } = useAppSelector((state) => state.penguins);

  const [isModalOpened, setModal] = useState(false);
  const [isMenuOpened, setMenuOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const getModalType = () => {
    const newModalType = modalType;
    return newModalType;
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const showNotifiyer =
    headerTitle === "Favorites" ||
    headerTitle.includes("Home") ||
    headerTitle.includes("Likes")
      ? true
      : false;

  return (
    <div className={`app`}>
      {isDesktop ? (
        <NavDektop headerTitle={headerTitle} />
      ) : (
        <NavMobile headerTitle={headerTitle} />
      )}

      {isModalOpen && (
        <Modal
          idToProcess={penguin.id}
          content={modalMessage}
          closeModal={setModal}
          type={getModalType()}
          form="Penguin"
        />
      )}
      {(isMenuOpen || isMenuOpened) && (
        <div className={`menu-nav`}>
          <Menu isMenuOpened={isMenuOpened || isMenuOpen} />
        </div>
      )}
      {(isMenuOpen || isMenuOpened) && (
        <ReactDimmer
          isOpen={isMenuOpened || isMenuOpen || isModalOpen || isModalOpened}
          exitDimmer={setMenuOpen || setModal}
          zIndex={90}
          blur={1.5}
        />
      )}
      {showTopBtn && <ScrollToTop />}
      {showNotifiyer ? <MessageNotifyer messages={newMessages} /> : ""}

      <ToastContainer limit={4} />
    </div>
  );
};

export default Navbar;
