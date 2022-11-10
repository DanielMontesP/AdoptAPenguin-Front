import { useEffect } from "react";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { getMessagesThunk } from "../../app/redux/thunks/messageThunk/messageThunk";

import {
  getPenguinThunk,
  loadFavsThunk,
  loadPenguinsThunk,
} from "../../app/redux/thunks/penguinThunk/penguinThunk";
import PenguinDetail from "../../components/PenguinDetail/PenguinDetail";

const DetailPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { penguin } = useAppSelector((state) => state.penguins);
  const { allPenguins } = useAppSelector((state) => state.penguins);
  const { headerTitle, headerLastTitle } = useAppSelector((state) => state.ui);

  const thisTitle = "Detail";

  const idPenguin = document.location.href.substring(
    document.location.href.lastIndexOf("/") + 1,
    document.location.href.length
  );
  useEffect(() => {
    headerLastTitle === "Favourites"
      ? dispatch(loadFavsThunk())
      : dispatch(loadPenguinsThunk());

    dispatch(getPenguinThunk(idPenguin));
    dispatch(getMessagesThunk(idPenguin));

    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };

    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);
  }, [dispatch, headerTitle, headerLastTitle, idPenguin]);

  return <PenguinDetail allPenguins={allPenguins} penguin={penguin} />;
};

export default DetailPage;
