import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../../app/redux/hooks/hooks";
import "../../styles/NavbarStyles.css";
import MessageNotifyer from "../MessageNotifyer/MessageNotifyer";
import NavDektop from "../NavDesktop/NavDesktop";
import NavMobile from "../NavMobile/NavMobile";
interface Props {
  headerTitle: string;
}

const Navbar = ({ headerTitle }: Props): JSX.Element => {
  const { isDesktop } = useAppSelector((state) => state.ui);
  const { newMessages } = useAppSelector((state) => state.user);

  const showNotifiyer = () => {
    return headerTitle === "Favorites" ||
      headerTitle.includes("Home") ||
      headerTitle.includes("Likes")
      ? true
      : false;
  };

  return (
    <div>
      {isDesktop ? (
        <NavDektop headerTitle={headerTitle} />
      ) : (
        <NavMobile headerTitle={headerTitle} />
      )}

      {showNotifiyer() ? <MessageNotifyer messages={newMessages} /> : ""}

      <ToastContainer limit={4} />
    </div>
  );
};

export default Navbar;
