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
import { Error404Page } from "./pages/Error404/Error404";
import PenguinsPage from "./pages/PenguinsPage/PenguinsPage";
import { getUserThunk } from "./app/redux/thunks/userThunk/userThunk";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { isDesktopActionCreator } from "./app/redux/features/uiSlice/uiSlice";
import UserMessagesPage from "./pages/UserMessagesPage/UserMessagesPage";
import Navbar from "./components/Navbar/Navbar";
import { connectedToServer } from "./functions/sysHandlers/sysHandlers";

function App() {
  const { logged, id } = useAppSelector((state) => state.user);
  const { headerTitle, isMenuOpen } = useAppSelector((state) => state.ui);
  const { connected } = useAppSelector((state) => state.system.server);

  const dispatch = useAppDispatch();

  const [isDesktop, setDesktop] = useState(window.innerWidth > 421);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 420);
  };

  let result = <></>;

  const handleNav = () => {
    if (logged) {
      result = (
        <Navbar
          isDesktop={isDesktop}
          headerTitle={headerTitle}
          isMenuOpen={isMenuOpen}
        />
      );
    }
  };

  handleNav();
  connectedToServer();
  useEffect(() => {
    window.addEventListener("resize", updateMedia);

    const token = localStorage.getItem("token");
    if (connected) {
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
      };
    }
  }, [connected, dispatch, logged, id, isDesktop, headerTitle]);

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
          path="/users/messages/:id"
          element={
            <CheckInSecurity>
              <UserMessagesPage />
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
          path="/reply/create"
          element={
            <CheckInSecurity>
              <CreatePage type="Create" form="Reply" />
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
    </>
  );
}

export default App;
