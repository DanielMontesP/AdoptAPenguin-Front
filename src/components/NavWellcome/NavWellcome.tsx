import "../../Styles/NavbarStyles.css";

const NavWellcome = (): JSX.Element => {
  return (
    <div className={`header-wellcome`}>
      <div className="header-title-container">
        <h1 className={`header-desktop-title1`}>Responsive site</h1>
        <h1 className={`header-desktop-title3`}>AdoptApenguin.com</h1>
        <h1 className={`header-desktop-title2`}>Amazing features...</h1>
      </div>
    </div>
  );
};

export default NavWellcome;
