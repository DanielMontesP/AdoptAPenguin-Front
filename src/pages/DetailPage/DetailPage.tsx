import { useEffect } from "react";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";

import {
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

  useEffect(() => {
    headerLastTitle === "Favorites"
      ? dispatch(loadFavsThunk())
      : dispatch(loadPenguinsThunk());

    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };

    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);
  }, [dispatch, headerTitle, headerLastTitle]);

  return <PenguinDetail allPenguins={allPenguins} penguin={penguin} />;
};

export default DetailPage;
