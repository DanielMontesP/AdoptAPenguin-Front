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

interface Props {
  type: string;
}

const PenguinsPage = ({ type }: Props) => {
  const dispatch = useAppDispatch();

  const { allPenguins } = useAppSelector((state) => state.penguins);
  const { headerTitle, modalType, headerLastTitle } = useAppSelector(
    (state) => state.ui
  );

  useEffect(() => {
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };
    if (modalType === "") {
      SetTitleHeader(type, headerLastTitle);

      if (type === "Likes") {
        dispatch(loadLikesThunk());
      } else if (type === "Favourites") {
        dispatch(loadFavsThunk());
      } else if (type === "Home") {
        dispatch(loadPenguinsThunk());
      }
    }
  }, [dispatch, headerTitle, modalType, headerLastTitle, type]);

  return <Penguins allPenguins={allPenguins} />;
};

export default PenguinsPage;
