import { useState } from "react";
import { ReactDimmer } from "react-dimmer";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/redux/hooks/hooks";
import HomePageStyles from "../../pages/HomePage/HomePageStyles";
import { Modal } from "../Modals/ModalPrompt";

const Home = (): JSX.Element => {
  const { user } = useAppSelector((state) => state);
  const [isModalOpen, setModal] = useState(true);

  return (
    <HomePageStyles className="info">
      <h1 className="display-none"> Home </h1>
      <div className="bt-container">
        <NavLink to="/login" className="link">
          <button className="bt-login">Login</button>
        </NavLink>
        <NavLink to="/users/register" className="link">
          <button className="bt-register">Register</button>
        </NavLink>

        {isModalOpen && (
          <Modal
            type={"Wellcome"}
            idPenguin={user.id}
            message={``}
            closeModal={setModal}
          />
        )}
        <ReactDimmer
          isOpen={isModalOpen}
          exitDimmer={setModal}
          zIndex={90}
          blur={1.5}
        />
      </div>
    </HomePageStyles>
  );
};

export default Home;
