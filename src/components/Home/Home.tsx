import { NavLink } from "react-router-dom";
import HomePageStyles from "../../Styles/PagesStyles";

const Home = (): JSX.Element => {
  return (
    <HomePageStyles className="container">
      <textarea className={`title-big`}>Adopt Apenguin .com</textarea>
      <div className="bt-container">
        <NavLink to="/login" className="link">
          <button className="bt-login">Login</button>
        </NavLink>
        <NavLink to="/users/register" className="link">
          <button className="bt-register">Sign Up</button>
        </NavLink>
      </div>
      <div className="footer">2022 Penguins Inc.</div>
    </HomePageStyles>
  );
};

export default Home;
