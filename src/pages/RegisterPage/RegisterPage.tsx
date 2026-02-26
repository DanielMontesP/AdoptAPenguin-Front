import { ReactElement } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "../../styles/FormsStyles.css";

const RegisterPage = (): ReactElement => {
  return (
    <div className="register-container">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
