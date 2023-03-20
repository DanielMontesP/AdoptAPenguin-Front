import { useEffect } from "react";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import Home from "../../components/Home/Home";
import { connectedToServer } from "../../functions/sysHandlers/sysHandlers";

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const thisTitle = "HomePage";

  const { headerTitle } = useAppSelector((state) => state.ui);

  useEffect(() => {
    connectedToServer();
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };
    headerTitle !== thisTitle && SetTitleHeader(thisTitle, headerTitle);
  }, [dispatch, headerTitle, thisTitle]);

  return <Home />;
};

export default HomePage;
