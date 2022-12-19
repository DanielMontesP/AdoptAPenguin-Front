import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../../app/redux/hooks/hooks";
import "../../styles/NavbarStyles.css";
import MessageNotifyer from "../MessageNotifyer/MessageNotifyer";
import NavDektop from "../NavDesktop/NavDesktop";
import NavMobile from "../NavMobile/NavMobile";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

interface Props {
  headerTitle: string;
}

const Navbar = ({ headerTitle }: Props): JSX.Element => {
  const { isDesktop } = useAppSelector((state) => state.ui);
  const { newMessages } = useAppSelector((state) => state.user);

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const showNotifiyer =
    headerTitle === "Favorites" ||
    headerTitle.includes("Home") ||
    headerTitle.includes("Likes")
      ? true
      : false;

  return (
    <div className={`app`}>
      {isDesktop ? (
        <NavDektop headerTitle={headerTitle} />
      ) : (
        <NavMobile headerTitle={headerTitle} />
      )}

      {showTopBtn && <ScrollToTop />}
      {showNotifiyer ? <MessageNotifyer messages={newMessages} /> : ""}

      <ToastContainer limit={4} />
    </div>
  );
};

export default Navbar;
