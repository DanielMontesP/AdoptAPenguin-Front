import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks/hooks";
import { registerThunk } from "../../app/redux/thunks/userThunk/userThunk";
import { NavLink } from "react-router-dom";
import {
  headerLastTitleActionCreator,
  headerTitleActionCreator,
} from "../../app/redux/features/uiSlice/uiSlice";
import { UserRegister } from "../../app/redux/types/userInterfaces/userInterfaces";
import imgHome from "../../images/lapanda.jpg";

const thisTitle = "Wellcome";

const RegisterForm = (): JSX.Element => {
  const initialFormData: UserRegister = {
    username: "",
    password: "",
  };

  const { headerTitle } = useAppSelector((state) => state.ui);

  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const processRegistration = () => {
    dispatch(registerThunk(formData, formData.password));
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();

    processRegistration();

    setFormData(initialFormData);
  };

  useEffect(() => {
    const SetTitleHeader = (title: string, lastTitle: string) => {
      dispatch(headerTitleActionCreator(title));
      dispatch(headerLastTitleActionCreator(lastTitle));
    };

    if (headerTitle !== thisTitle) SetTitleHeader(thisTitle, headerTitle);
  }, [dispatch, headerTitle]);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <img src={imgHome} title="Git" alt="Git" className="img-Home" />

      <NavLink to="/login" className="link">
        Already have an account? Please Log In
      </NavLink>

      <label htmlFor="username"> Username </label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
        name="Username"
      />
      <label htmlFor="password"> Password </label>
      <input
        type="password"
        id="password"
        autoComplete="off"
        value={formData.password}
        placeholder="Password"
        onChange={handleInputChange}
        name="Password"
      />
      <div className="submitContainer">
        <button type="submit" className="bt-register">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
