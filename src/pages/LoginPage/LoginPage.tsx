import { ReactElement } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { useEffect } from "react";
import "../../styles/FormsStyles.css";

const LoginPage = (): ReactElement => {
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
      <div className="repos">
        <div className="repos__container">
          <img
            src="https://avatars2.githubusercontent.com/u/39168408?s=460&v=4"
            title="sonarcloud"
            alt="sonarcloud"
            width="30"
            height="30"
            className="img_repos"
          />
          <span>SONARCLOUD</span>
          <a href="https://sonarcloud.io/summary/overall?id=DanielMontesP_AdoptAPenguin-Front">
            FRONT
          </a>
          |
          <a href="https://sonarcloud.io/summary/overall?id=DanielMontesP_AdoptAPenguin-Back">
            BACK
          </a>
        </div>
        <div className="repos__container">
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/670a611ad1c3e057ee385168d65c8ab27a7e1be5/icons/git/git-plain.svg"
            title="github"
            alt="gitHub"
            width="30"
            height="30"
            className="img_repos"
          />
          <span>REPOS</span>
          <a href="https://github.com/DanielMontesP/AdoptAPenguin-Front">
            FRONT
          </a>
          |
          <a href="https://github.com/DanielMontesP/AdoptAPenguin-Back">BACK</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
