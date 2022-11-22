import LoginForm from "../../components/LoginForm/LoginForm";
import "react-toastify/dist/ReactToastify.css";
import FormsStyles from "../../Styles/FormsStyles";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useEffect } from "react";

const LoginPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const thisTitle = "LoginPage";

  const { headerTitle } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };
    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);
  }, [dispatch, headerTitle, thisTitle]);

  return (
    <FormsStyles className="container">
      <h1 className="display-none">AdoptaUnPingüino.com</h1>
      <LoginForm />
    </FormsStyles>
  );
};

export default LoginPage;
