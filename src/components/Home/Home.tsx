import { NavLink } from "react-router-dom";
import HomePageStyles from "../../Styles/PagesStyles";
import imgHome from "../../images/lapanda.jpg";

const Home = (): JSX.Element => {
  return (
    <HomePageStyles className="container">
      <h1 className="display-none"> Home </h1>
      <img src={imgHome} title="Git" alt="Git" className="img-Home" />

      <div className="bt-container">
        <NavLink to="/login" className="link">
          <button className="bt-login">Login</button>
        </NavLink>
        <NavLink to="/users/register" className="link">
          <button className="bt-register">Register</button>
        </NavLink>
      </div>
    </HomePageStyles>
  );
};

export default Home;
