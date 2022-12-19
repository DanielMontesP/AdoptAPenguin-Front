import { useAppSelector } from "../../app/redux/hooks/hooks";
import MenuDesktop from "../MenuDesktop/MenuDesktop";
import MenuMobile from "../MenuMobile/MenuMobile";

interface Props {
  isMenuOpened: boolean;
}

const Menu = ({ isMenuOpened }: Props): JSX.Element => {
  const { isDesktop, isMenuOpen } = useAppSelector((state) => state.ui);

  return (
    <div className={`menu-container`}>
      {isDesktop ? (
        <MenuDesktop isMenuOpened={isMenuOpen} />
      ) : (
        <MenuMobile isMenuOpened={isMenuOpen} />
      )}
    </div>
  );
};

export default Menu;
