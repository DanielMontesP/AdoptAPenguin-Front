import { NavLink } from "react-router-dom";
import HomePageStyles from "../../Styles/PagesStyles";

const Home = (): JSX.Element => {
  return (
    <HomePageStyles className="container">
      <h1 className="display-none"> Home </h1>

      <div className="bt-container">
        <NavLink to="/login" className="link">
          <button className="bt-login">Login</button>
        </NavLink>
        <NavLink to="/users/register" className="link">
          <button className="bt-register">Sign Up</button>
        </NavLink>
      </div>
    </HomePageStyles>
  );
};

export default Home;
