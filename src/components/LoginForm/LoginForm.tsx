import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/redux/hooks/hooks";
import { LoginData } from "../../app/redux/types/userInterfaces/userInterfaces";
import { loginThunk } from "../../app/redux/thunks/userThunk/userThunk";

const LoginForm = () => {
  const blankData: LoginData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(blankData);
  const buttonDisabled = formData.password === "" || formData.username === "";
  const dispatch = useAppDispatch();

  const resetForm = () => {
    setFormData(blankData);
  };

  const changeData = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(loginThunk(formData));

    resetForm();
  };

  return (
    <form className="form" autoComplete="off" noValidate onSubmit={submitLogin}>
      <label className="label-username" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        value={formData.username}
        onChange={changeData}
        placeholder="Username"
        autoComplete="off"
        alt="Username"
        className="form-input"
      />

      <label className="label-password" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={formData.password}
        onChange={changeData}
        placeholder="Password"
        autoComplete="off"
        alt="Password"
        className="form-input"
      />
      <div className="form-footer">
        New user? please
        <Link to="/users/register" className="form-link">
          {" "}
          Register
        </Link>
      </div>

      <div className="submitContainer">
        <button disabled={buttonDisabled} className="bt-login">
          Login
        </button>
        <div className="footer-home">2022 Penguins Inc.</div>
      </div>
    </form>
  );
};
export default LoginForm;
