import { IPenguin } from "../../app/redux/types/penguin/penguinInterfaces";
import Penguin from "../Penguin/Penguin";
import "../../rstyles/PagesStyles.css";
interface Props {
  allPenguins: IPenguin[];
}

const Favs = ({ allPenguins }: Props): JSX.Element => {
  return (
    <div className={`penguins-container`}>
      <h1 className="display-none">AdoptAPenguin.com</h1>
      {allPenguins.map((penguin, index) => {
        return <Penguin key={penguin.id} penguin={penguin} />;
      })}
    </div>
  );
};
export default Favs;
