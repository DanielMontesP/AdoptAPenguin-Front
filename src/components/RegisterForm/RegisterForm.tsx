import { ChangeEvent, useEffect, useState, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { registerThunk } from "../../app/redux/thunks/userThunk/userThunk";
import { Link } from "react-router-dom";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { UserRegister } from "../../app/redux/types/userInterfaces/userInterfaces";

const thisTitle = "AdoptAPenguin.com";

const RegisterForm = (): ReactElement => {
  const initialFormData: UserRegister = {
    username: "",
    password: "",
  };

  const { headerTitle } = useAppSelector((state) => state.ui);

  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): boolean => {
    try {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
      return true;
    } catch {
      return false;
    }
  };

  const processRegistration = (): boolean => {
    try {
      dispatch(registerThunk(formData, formData.password));
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>): boolean => {
    try {
      event.preventDefault();
      processRegistration();
      setFormData(initialFormData);
      return true;
    } catch {
      return false;
    }
  };

  useEffect((): void => {
    const SetTitleHeader = (title: string, lastTitle: string): boolean => {
      try {
        dispatch(headerTitleActionCreator(title));
        dispatch(headerLastTitleActionCreator(lastTitle));
        return true;
      } catch {
        return false;
      }
    };
    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);
  }, [dispatch, headerTitle]);

  return (
    <form
      className="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <label className="label-username" htmlFor="username">
        {" "}
        Username{" "}
      </label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
        name="Username"
        className="form-input"
      />
      <label className="label-password" htmlFor="password">
        {" "}
        Password{" "}
      </label>
      <input
        type="password"
        id="password"
        autoComplete="off"
        value={formData.password}
        placeholder="Password"
        onChange={handleInputChange}
        name="Password"
        className="form-input"
      />
      <div className="form-footer">
        Registered? Please
        <Link to="/login" className="form-link">
          {" "}
          Log in
        </Link>
      </div>
      <div className="submitContainer">
        <button type="submit" className="bt-register" title="bt-submit">
          Register
        </button>
        <div className="footer-home">2022 Penguins Inc.</div>
      </div>
    </form>
  );
};

export default RegisterForm;
