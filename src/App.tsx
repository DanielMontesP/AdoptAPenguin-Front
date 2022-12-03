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
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import UserMessagesPage from "./pages/UserMessagesPage/UserMessagesPage";

function App() {
  const { logged, id } = useAppSelector((state) => state.user);
  const { headerTitle, loading } = useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();

  const [isDesktop, setDesktop] = useState(window.innerWidth > 421);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastPosition] = useState(0.1);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 420);
  };

  let notScrolled = false;

  const handleScroll = () => {
    const position = window.scrollY;

    setScrollPosition(position);
  };

  if (scrollPosition > lastPosition) {
    notScrolled = isDesktop ? false : true;
  }

  let result = <></>;

  const handleNav = () => {
    if (logged && !notScrolled) {
      result = <Navbar headerTitle={headerTitle} />;
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
  }, [dispatch, logged, loading, id, isDesktop, notScrolled, headerTitle]);

  return (
    <>
      {result}
      <ScrollToTop />
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
              <PenguinsPage type="Favourites" />
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
