import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { ReactDimmer } from "react-dimmer";
import { ToastContainer } from "react-toastify";
import {
  isMenuOpenActionCreator,
  isModalOpenActionCreator,
  isSearchOpenActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  handleSearchEnter,
  handleSearchSubmit,
} from "../../functions/uiHandlers/uiHandlers";
import "../../styles/NavbarStyles.css";
import Menu from "../Menu/Menu";
import { Modal } from "../Modals/ModalPrompt";
import NavDektop from "../NavDesktop/NavDesktop";
import NavMobile from "../NavMobile/NavMobile";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

interface Props {
  headerTitle: string;
}

const Navbar = ({ headerTitle }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const {
    isDesktop,
    modalMessage,
    modalType,
    isModalOpen,
    isMenuOpen,
    isSearchOpen,
  } = useAppSelector((state) => state.ui);
  const { penguin } = useAppSelector((state) => state.penguins);
  const { stringToSearch } = useAppSelector((state) => state.ui);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [, setModal] = useState(false);
  const [, setMenu] = useState(false);
  const [, setSearch] = useState(false);

  const searchPlaceHolderText = "Search by name/category/description...";

  const isOpen = isMenuOpen || isModalOpen || isSearchOpen;

  const getModalType = () => {
    const newModalType = modalType;
    return newModalType;
  };

  const handleSearchSubmitCall = () => {
    dispatch(isSearchOpenActionCreator(false));
    dispatch(stringToSearchActionCreator(stringToSearch));
    handleSearchSubmit(dispatch, headerTitle, stringToSearch);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(stringToSearchActionCreator(event.target.value));
  };

  const handleSearchEnterCall = (
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    handleSearchEnter(event, stringToSearch, dispatch, headerTitle);
  };

  const handleDimmer = () => {
    dispatch(isMenuOpenActionCreator(false));
    dispatch(isModalOpenActionCreator(false));
    dispatch(isSearchOpenActionCreator(false));
    setSearch(false);
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

  return (
    <div className={`app`}>
      {isDesktop ? (
        <NavDektop headerTitle={headerTitle} />
      ) : (
        <NavMobile headerTitle={headerTitle} />
      )}

      {showTopBtn && <ScrollToTop />}

      {isSearchOpen ? (
        <div className="search-container">
          <input
            className={`search-input`}
            type="text"
            placeholder={searchPlaceHolderText}
            onChange={handleSearchChange}
            onKeyDown={handleSearchEnterCall}
            autoFocus
            value={stringToSearch}
          />
          <button
            onClick={handleSearchSubmitCall}
            className={`bt-search-submit`}
            title="bt-search-submit"
          />
        </div>
      ) : (
        ""
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
      {isMenuOpen && (
        <div className={`menu-nav`}>
          <Menu isMenuOpened={isMenuOpen} />
        </div>
      )}
      {(isMenuOpen || isSearchOpen || isModalOpen) && (
        <div onClick={handleDimmer}>
          <ReactDimmer
            isOpen={isOpen}
            exitDimmer={setMenu || setModal || setSearch}
            zIndex={90}
            blur={1.5}
          />
        </div>
      )}
      <ToastContainer limit={4} />
    </div>
  );
};

export default Navbar;
