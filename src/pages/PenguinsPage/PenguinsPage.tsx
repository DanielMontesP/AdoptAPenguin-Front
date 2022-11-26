import Penguins from "../../components/Penguins/Penguins";
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
import {
  getMessagesThunk,
  resetMessageThunk,
} from "../../app/redux/thunks/messageThunk/messageThunk";

interface Props {
  type: string;
}

const PenguinsPage = ({ type }: Props) => {
  const dispatch = useAppDispatch();

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
      if (!isDesktop) {
        SetTitleHeader(type, headerLastTitle);
      }
      if (type === "Likes") {
        dispatch(loadLikesThunk());
      } else if (type === "Favourites") {
        dispatch(loadFavsThunk());
      } else if (type === "Home") {
        dispatch(loadPenguinsThunk());
      }
    }
    if (penguin.id !== "") {
      dispatch(getMessagesThunk(penguin.id));
    }
    dispatch(resetMessageThunk());
  }, [
    dispatch,
    headerTitle,
    isDesktop,
    modalType,
    headerLastTitle,
    penguin,
    type,
  ]);

  return <Penguins allPenguins={allPenguins} />;
};

export default PenguinsPage;
