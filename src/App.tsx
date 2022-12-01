import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CheckOutSecurity from "./components/CheckOutSecurity/CheckOutSecurity";
import CheckInSecurity from "./components/CheckInSecurity/CheckInSecurity";
import CreatePage from "./pages/CreatePage/CreatePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import { useAppDispatch, useAppSelector } from "./app/redux/hooks/hooks";
import { useEffect, useState } from "react";
import { UserInfo } from "./app/redux/types/userInterfaces/userInterfaces";
import jwtDecode from "jwt-decode";
import { logInActionCreator } from "./app/redux/features/userSlice/userSlice";
import Navbar from "./components/Navbar/Navbar";
import { Error404Page } from "./pages/Error404/Error404";
import PenguinsPage from "./pages/PenguinsPage/PenguinsPage";
import { getUserThunk } from "./app/redux/thunks/userThunk/userThunk";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { isDesktopActionCreator } from "./app/redux/features/uiSlice/uiSlice";
import { Modal } from "./components/Modals/ModalPrompt";
import { ReactDimmer } from "react-dimmer";

function App() {
  const { logged, id } = useAppSelector((state) => state.user);
  const { headerTitle, loading } = useAppSelector((state) => state.ui);
  const { penguin } = useAppSelector((state) => state.penguins);

  const dispatch = useAppDispatch();

  const [isMenuOpened, setMenuOpen] = useState(false);
  const [, setModal] = useState(false);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 421);
  const [scrollPosition, setSrollPosition] = useState(0);

  const { modalMessage, modalType, isModalOpen, isMenuOpen } = useAppSelector(
    (state) => state.ui
  );

  const getModalType = () => {
    const newModalType = modalType;
    return newModalType;
  };

  const updateMedia = () => {
    setDesktop(window.innerWidth > 420);
  };

  let scrolledUp = false;

  const handleScroll = () => {
    const position = window.scrollY;
    setSrollPosition(position);
  };

  if (scrollPosition) {
    scrolledUp = true;
  }

  let result = <></>;

  const handleNav = () => {
    const navComponent = <Navbar headerTitle={headerTitle} />;

    if ((logged && isDesktop) || (logged && !isDesktop && !scrolledUp)) {
      result = navComponent;
    } else {
      result = <></>;
    }
  };

  handleNav();

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("token");

    if (token || logged) {
      const userData: UserInfo = jwtDecode(token as string);
      dispatch(logInActionCreator(userData));
      if (userData.id !== id) {
        dispatch(getUserThunk(userData.id));
      }
    }

    dispatch(isDesktopActionCreator(isDesktop));

    return () => {
      window.removeEventListener("resize", updateMedia);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, logged, loading, id, isDesktop, scrolledUp, headerTitle]);

  return (
    <>
      {result}

      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route
          path="/homepage"
          element={
            <CheckOutSecurity>
              <HomePage />
            </CheckOutSecurity>
          }
        />
        <Route
          path="/login"
          element={
            <CheckOutSecurity>
              <LoginPage />
            </CheckOutSecurity>
          }
        />
        <Route
          path="/users/register"
          element={
            <CheckOutSecurity>
              <RegisterPage />
            </CheckOutSecurity>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <CheckInSecurity>
              <CreatePage type="Edit" form="User" />
            </CheckInSecurity>
          }
        />
        <Route
          path="/message/edit/:idMessage"
          element={
            <CheckInSecurity>
              <CreatePage type="Edit" form="Message" />
            </CheckInSecurity>
          }
        />
        <Route
          path="/message/create"
          element={
            <CheckInSecurity>
              <CreatePage type="Create" form="Message" />
            </CheckInSecurity>
          }
        />
        <Route
          path="/penguins"
          element={
            <CheckInSecurity>
              <PenguinsPage type="Home" />
            </CheckInSecurity>
          }
        />
        <Route
          path="/penguins/favs"
          element={
            <CheckInSecurity>
              <PenguinsPage type="Favorites" />
            </CheckInSecurity>
          }
        />
        <Route
          path="/penguins/likes"
          element={
            <CheckInSecurity>
              <PenguinsPage type="Likes" />
            </CheckInSecurity>
          }
        />
        <Route
          path="/penguins/search"
          element={
            <CheckInSecurity>
              <PenguinsPage type="Search" />
            </CheckInSecurity>
          }
        />
        <Route
          path="/create"
          element={
            <CheckInSecurity>
              <CreatePage type="Create" form="Penguin" />
            </CheckInSecurity>
          }
        />
        <Route
          path="/penguins/:id"
          element={
            <CheckInSecurity>
              <CreatePage type="Edit" form="Penguin" />
            </CheckInSecurity>
          }
        />
        <Route
          path="/detail/:idPenguin"
          element={
            <CheckInSecurity>
              <DetailPage />
            </CheckInSecurity>
          }
        />
        <Route
          path="*"
          element={
            <CheckInSecurity>
              <Error404Page />
            </CheckInSecurity>
          }
        />
      </Routes>
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
    </>
  );
}

export default App;
