import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import "../../styles/NavbarStyles.css";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  modalTypeActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { BlankMessageDataInterface } from "../../app/redux/types/message/messageInterfaces";

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
  const { headerLastTitle } = useAppSelector((state) => state.ui);
  const [, setFormData] = useState(blankData);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastPosition, setLastPosition] = useState(scrollPosition + 0.1);
  const { penguin } = useAppSelector((state) => state.penguins);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let isHomePage = headerTitle === "Home";

  let isScrolled = false;
  let classHeaderTitle = "header-desktop-title";

  let HidderDesktopButtons = "";

  const handleScroll = () => {
    const position = window.scrollY;

    setScrollPosition(position);
  };

  const handleMenu = () => {
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

  if (scrollPosition <= lastPosition) {
    isScrolled = false;
  } else {
    isScrolled = true;
    setLastPosition(scrollPosition);
  }

  const headerClass = `header`;
  const classBack = "bt-back";
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <>
      {!isScrolled ? (
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
      ) : (
        ""
      )}
    </>
  );
};

export default NavMobile;
