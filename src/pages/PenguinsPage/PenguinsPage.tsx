import Penguins from "../../components/ScrollToTop/Penguins";
import { useEffect } from "react";
import {
  loadFavsThunk,
  loadLikesThunk,
  loadPenguinsThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { resetMessageThunk } from "../../app/redux/thunks/messageThunk/messageThunk";
import "../../styles/PagesStyles.css";
import { getUserMessagesThunk } from "../../app/redux/thunks/userThunk/userThunk";

interface Props {
  type: string;
}

const PenguinsPage = ({ type }: Props) => {
  const dispatch = useAppDispatch();
  const idUser = useAppSelector((state) => state.user.id);

  const { allPenguins, penguin } = useAppSelector((state) => state.penguins);
  const { headerTitle, modalType, headerLastTitle, isDesktop } = useAppSelector(
    (state) => state.ui
  );

  useEffect(() => {
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };
    if (modalType === "") {
      SetTitleHeader(type, headerLastTitle);

      if (headerTitle === "Likes") {
        dispatch(loadLikesThunk());
      } else if (headerTitle === "Favorites") {
        dispatch(loadFavsThunk());
      } else {
        dispatch(loadPenguinsThunk());
      }
    }

    dispatch(resetMessageThunk());

    dispatch(getUserMessagesThunk(idUser));
  }, [
    dispatch,
    headerTitle,
    isDesktop,
    modalType,
    headerLastTitle,
    penguin,
    type,
    idUser,
  ]);

  return <Penguins allPenguins={allPenguins} />;
};

export default PenguinsPage;
