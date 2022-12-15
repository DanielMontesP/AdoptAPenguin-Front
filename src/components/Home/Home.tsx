import { NavLink } from "react-router-dom";
import HomePageStyles from "../../styles/PagesStyles";

const Home = (): JSX.Element => {
  return (
    <HomePageStyles className="container">
      <div className="bt-container">
        <textarea
          className={`title-big`}
          value="Adopt Apenguin .com"
          readOnly
        />
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
