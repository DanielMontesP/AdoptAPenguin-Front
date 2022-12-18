import LoginForm from "../../components/LoginForm/LoginForm";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useEffect } from "react";
import "../../rstyles/FormsStyles.css";

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
    <div className="login-container">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
