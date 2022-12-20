import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import "../../styles/NavbarStyles.css";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
  isMenuOpenActionCreator,
  isSearchOpenActionCreator,
  modalTypeActionCreator,
  stringToSearchActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { BlankMessageDataInterface } from "../../app/redux/types/message/messageInterfaces";
import {
  handleSearchEnter,
  handleSearchSubmit,
  handleFocus,
} from "../../functions/uiHandlers/uiHandlers";

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
  const { headerLastTitle, isSearchOpen, stringToSearch } = useAppSelector(
    (state) => state.ui
  );
  const [, setFormData] = useState(blankData);
  const [, setSearch] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastPosition, setLastPosition] = useState(scrollPosition + 0.1);
  const { penguin } = useAppSelector((state) => state.penguins);

  const classInputSearch = `search-input`;
  const setOpacityFull = " opacity-full";

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let isHomePage = headerTitle === "Home";

  let isScrolled = false;
  let classHeaderTitle = "nav-title";

  const searchPlaceHolderText = "Search by name/category/description...";
  let HidderDesktopButtons = "";

  const handleFocusCall = (field: string): void => {
    handleFocus(field);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(stringToSearchActionCreator(event.target.value));
  };

  const handleSearchSubmitCall = () => {
    handleSearchSubmit(dispatch, headerTitle, stringToSearch);
  };

  const handleSearchEnterCall = (
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    handleSearchEnter(event, stringToSearch, dispatch, headerTitle);
  };

  const handleScroll = () => {
    const position = window.scrollY;

    setScrollPosition(position);
  };

  const handleMenu = () => {
    dispatch(isMenuOpenActionCreator(true));
  };

  const handleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    const type = event.currentTarget.title;

    switch (type) {
      case "desktop-bt-search":
        handleFocusCall(".menu-search-input");
        break;
      case "bt-search":
        handleFocusCall(".search-input");
        break;
      default:
    }
    setSearch((prevState) => !prevState);

    dispatch(isMenuOpenActionCreator(false));
    dispatch(isSearchOpenActionCreator(true));
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

  const handleSetLastPosition = () => {
    setLastPosition(scrollPosition);
  };

  const HidderSearch = isSearchOpen
    ? `${classInputSearch} ${setOpacityFull}`
    : `${classInputSearch}`;

  if (scrollPosition > lastPosition) {
    isScrolled = true;
    handleSetLastPosition();
  }

  const headerClass = `nav`;
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
      {isSearchOpen ? (
        <div className="search-container">
          <button
            onClick={handleSearch}
            className={`menu-bt-search`}
            title="bt-search"
          />
          <button
            onClick={handleSearchSubmitCall}
            className={`bt-search-submit ${HidderSearch.replace(
              "search-input",
              ""
            )}`}
            title="bt-search-submit"
          />
          <input
            className={`${HidderSearch}`}
            type="text"
            placeholder={searchPlaceHolderText}
            onChange={handleSearchChange}
            onKeyDown={handleSearchEnterCall}
            autoFocus
            value={stringToSearch}
          />{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NavMobile;
