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

  let thisTitle = "";

  switch (type) {
    case "Likes":
      thisTitle = type;
      break;
    case "Favourites":
      thisTitle = type;
      break;

    default:
      thisTitle = "Home";
  }

  const { allPenguins } = useAppSelector((state) => state.penguins);
  const { headerTitle } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };
    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);

    if (thisTitle === "Likes") {
      dispatch(loadLikesThunk());
    } else if (thisTitle === "Favourites") {
      dispatch(loadFavsThunk());
    } else {
      dispatch(loadPenguinsThunk());
    }
  }, [dispatch, headerTitle, thisTitle, type]);

  return <Penguins allPenguins={allPenguins} />;
};

export default PenguinsPage;
