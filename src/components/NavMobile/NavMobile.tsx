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
import MessageNotifyer from "../MessageNotifyer/MessageNotifyer";
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
  const { penguin } = useAppSelector((state) => state.penguins);
  const { newMessages } = useAppSelector((state) => state.user);

  const [, setFormData] = useState(blankData);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastPosition, setLastPosition] = useState(scrollPosition);
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let isHomePage = headerTitle === "Home";

  let classHeaderTitle = "nav-title";
  let HidderDesktopButtons = "";

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

  const classBack = "bt-back";

  const isNotifiyerVisible =
    headerTitle !== "Penguin" &&
    headerTitle !== "New Message" &&
    headerTitle !== "New Penguin" &&
    headerTitle !== "Inbox" &&
    headerTitle !== "Detail";

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      if (position > lastPosition) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      setLastPosition(scrollPosition);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastPosition, scrollPosition]);

  return (
    <>
      {!isScrolled ? (
        <div className={`nav`}>
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

          {isNotifiyerVisible ? <MessageNotifyer messages={newMessages} /> : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NavMobile;
