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

function App() {
  const { logged, id } = useAppSelector((state) => state.user);
  const { headerTitle, loading } = useAppSelector((state) => state.ui);
  const [, setMenu] = useState(false);

  const dispatch = useAppDispatch();
  const [isDesktop, setDesktop] = useState(window.innerWidth > 421);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 420);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);

    const token = localStorage.getItem("token");

    if (token || logged) {
      const userData: UserInfo = jwtDecode(token as string);
      dispatch(logInActionCreator(userData));
      if (userData.id !== id) {
        dispatch(getUserThunk(userData.id));
      }
      loading ? setMenu(true) : setMenu(false);
    }
    dispatch(isDesktopActionCreator(isDesktop));
    return () => window.removeEventListener("resize", updateMedia);
  }, [dispatch, logged, loading, id, isDesktop]);

  return (
    <>
      <Navbar headerTitle={headerTitle} />

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
              <CreatePage />
            </CheckInSecurity>
          }
        />
        <Route
          path="/penguins"
          element={
            <CheckInSecurity>
              <PenguinsPage type="HomePage" />
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
          path="/create"
          element={
            <CheckInSecurity>
              <CreatePage />
            </CheckInSecurity>
          }
        />
        <Route
          path="/penguins/edit/:id"
          element={
            <CheckInSecurity>
              <CreatePage />
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
