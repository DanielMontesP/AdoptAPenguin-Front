import "../../Styles/NavbarStyles.css";

interface Props {
  headerTitle: string;
}
export const NavWellcome = ({ headerTitle }: Props): JSX.Element => {
  const isWellcome = headerTitle === "HomePage";

  const content = () => {
    return (
      <div className={`header-wellcome`} placeholder="header-wellcome"></div>
    );
  };

  return <>{isWellcome ? content() : ""}</>;
};
