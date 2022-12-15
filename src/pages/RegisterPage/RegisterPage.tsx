import RegisterForm from "../../components/RegisterForm/RegisterForm";
import FormsStyles from "../../styles/FormsStyles";

const RegisterPage = (): JSX.Element => {
  return (
    <FormsStyles className="container">
      <RegisterForm />;
    </FormsStyles>
  );
};

export default RegisterPage;
