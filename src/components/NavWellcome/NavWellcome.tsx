import "../../Styles/NavbarStyles.css";

interface Props {
  headerTitle: string;
}
export const NavWellcome = ({ headerTitle }: Props): JSX.Element => {
  const isWellcome = headerTitle === "HomePage";

  const content = () => {
    return (
      <div className={`header-wellcome`}>
        <div className="header-title-container">
          <h1 className={`header-desktop-title3`}>
            Adopt
            <br />
            Apenguin
            <br />
            .com
          </h1>
        </div>
      </div>
    );
  };

  return <>{isWellcome ? content() : ""}</>;
};
